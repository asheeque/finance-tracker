package resolvers

import (
	"net/http"
	"personal-finance-tracker-be/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// GetUser handles the retrieval of a user by ID
func (r *Resolver) GetUser(c *gin.Context) {
	// Extract userID from the JWT claims in the Gin context
	userIDRaw, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	// Convert the userID to the appropriate type (primitive.ObjectID)
	userID, ok := userIDRaw.(primitive.ObjectID)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID format"})
		return
	}

	// Fetch the user from the database
	user, err := r.repository.GetUserByID(userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Return the user data
	c.JSON(http.StatusOK, user)
}

// LoginUser handles user login using email and password
func (r *Resolver) LoginUser(c *gin.Context) {
	var loginRequest struct {
		Email    string `json:"email" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	// Bind the JSON payload to the loginRequest struct
	if err := c.ShouldBindJSON(&loginRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	// Validate the user credentials
	token, err := r.service.AuthenticateUser(loginRequest.Email, loginRequest.Password)
	if err != nil {
		if err.Error() == "invalid credentials" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"}) // Unauthorized for invalid credentials
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	// Return a response with the authentication token
	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"token":   token,
	})
}

// CreateUser handles the creation of a new user
func (r *Resolver) CreateUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	// Call the service layer to create the user and generate a token
	token, err := r.service.CreateUser(&user)
	if err != nil {
		if err.Error() == "a user with this email already exists" {
			c.JSON(http.StatusConflict, gin.H{"error": err.Error()}) // Return conflict status if user exists
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	// Return a response with the newly created user's ID and token
	c.JSON(http.StatusCreated, gin.H{
		"message": "User created successfully",
		"token":   token,
	})
}

// UpdateUser allows a user to update their profile
func (r *Resolver) UpdateUser(c *gin.Context) {
	// Extract authenticated user's ID from the token
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	// Parse the updated data from the request body
	var updatedData models.User
	if err := c.ShouldBindJSON(&updatedData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	// Call the service layer to update the user
	updatedUser, err := r.service.UpdateUser(userID.(primitive.ObjectID), &updatedData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User updated successfully",
		"user":    updatedUser,
	})
}
