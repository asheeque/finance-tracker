package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Transaction represents a financial transaction
type Transaction struct {
	ID              primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID          primitive.ObjectID `bson:"user_id" json:"user_id"` // Links transaction to a user
	Amount          float64            `bson:"amount" json:"amount"`
	Category        string             `bson:"category" json:"category"`
	TransactionDate string             `bson:"transaction_date" json:"transaction_date"`
	TransactionType string             `bson:"transaction_type" json:"transaction_type"`
	Description     string             `bson:"description,omitempty" json:"description,omitempty"`
	Date            time.Time          `bson:"date" json:"date"`
}
