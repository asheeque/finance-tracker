package service

import (
	"errors"
	"personal-finance-tracker-be/models"
	"personal-finance-tracker-be/utils"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

func (s *Service) CreateUser(user *models.User) (string, error) {
	// Hash the user's password before storing it
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	user.Password = string(hashedPassword)

	// Call the repository method to save the user
	err = s.repository.CreateUser(user)
	if err != nil {
		return "", err
	}

	// Generate a JWT token for the newly created user
	token, err := utils.GenerateJWT(user.ID, user.Email)
	if err != nil {
		return "", err
	}

	return token, nil
}

// AuthenticateUser verifies email and password, then generates a JWT token
func (s *Service) AuthenticateUser(email, password string) (string, error) {
	// Fetch the user by email
	user, err := s.repository.GetUserByEmail(email)
	if err != nil {
		return "", errors.New("invalid credentials")
	}

	// Compare the provided password with the stored hashed password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return "", errors.New("invalid credentials")
	}

	// Generate JWT token
	token, err := utils.GenerateJWT(user.ID, user.Email)
	if err != nil {
		return "", err
	}

	return token, nil
}

func (s *Service) UpdateUser(userID primitive.ObjectID, updatedData *models.User) (*models.User, error) {
	user, err := s.repository.GetUserByID(userID)
	if err != nil {
		return nil, err
	}

	// Update fields if they are provided
	if updatedData.Name != "" {
		user.Name = updatedData.Name
	}
	if updatedData.Phone != "" {
		user.Phone = updatedData.Phone
	}
	if updatedData.Address != "" {
		user.Address = updatedData.Address
	}
	user.UpdatedAt = time.Now()

	// Save the updated user
	err = s.repository.UpdateUser(user)
	if err != nil {
		return nil, err
	}

	return user, nil
}
