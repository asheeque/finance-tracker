package repository

import (
	"context"
	"personal-finance-tracker-be/models"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (r *Repository) CreateTransaction(transaction *models.Transaction) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Insert the transaction and capture the result
	result, err := r.transactionCollRef.InsertOne(ctx, transaction)
	if err != nil {
		return err
	}

	// Set the generated ID in the transaction object
	if oid, ok := result.InsertedID.(primitive.ObjectID); ok {
		transaction.ID = oid
	}

	return nil
}

func (r *Repository) GetTransactions(userID primitive.ObjectID) ([]models.Transaction, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var transactions []models.Transaction
	filter := bson.M{"user_id": userID}
	cursor, err := r.transactionCollRef.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var transaction models.Transaction
		if err := cursor.Decode(&transaction); err != nil {
			return nil, err
		}
		transactions = append(transactions, transaction)
	}

	return transactions, nil
}

func (r *Repository) UpdateTransaction(userID, transactionID primitive.ObjectID, updatedData *models.Transaction) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"_id": transactionID, "user_id": userID}
	update := bson.M{"$set": updatedData}

	_, err := r.transactionCollRef.UpdateOne(ctx, filter, update)
	return err
}

func (r *Repository) DeleteTransaction(userID, transactionID primitive.ObjectID) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"_id": transactionID, "user_id": userID}
	_, err := r.transactionCollRef.DeleteOne(ctx, filter)
	return err
}
