package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// User represents a user model
type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`                      // MongoDB Object ID
	Name      string             `bson:"name" json:"name"`                             // Full name of the user
	Email     string             `bson:"email" json:"email"`                           // Unique email address
	Password  string             `bson:"password,omitempty" json:"password,omitempty"` // Hashed password
	Role      string             `bson:"role" json:"role"`                             // Role for access control (e.g., "admin", "user")
	CreatedAt time.Time          `bson:"created_at" json:"created_at"`                 // Account creation timestamp
	UpdatedAt time.Time          `bson:"updated_at" json:"updated_at"`                 // Last update timestamp
	Active    bool               `bson:"active" json:"active"`                         // Indicates if the account is active
	Phone     string             `bson:"phone,omitempty" json:"phone,omitempty"`       // Optional phone number
	Address   string             `bson:"address,omitempty" json:"address,omitempty"`   // Optional address
}
