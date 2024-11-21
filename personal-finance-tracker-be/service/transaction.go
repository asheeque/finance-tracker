package service

import (
	"errors"
	"personal-finance-tracker-be/models"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (s *Service) CreateTransaction(transaction *models.Transaction) error {
	// Parse transaction_date into time.Time
	parsedDate, err := time.Parse("2006-01-02", transaction.TransactionDate)
	if err != nil {
		return errors.New("invalid transaction_date format, expected YYYY-MM-DD")
	}

	// Format and store transaction_date as YYYY-MM-DD (UTC)
	transaction.TransactionDate = parsedDate.Format("2006-01-02") // Standardize to date-only format
	transaction.Date = time.Now().UTC()

	return s.repository.CreateTransaction(transaction)
}

func (s *Service) GetTransactions(userID primitive.ObjectID) ([]models.Transaction, error) {
	return s.repository.GetTransactions(userID)
}

func (s *Service) UpdateTransaction(userID, transactionID primitive.ObjectID, updatedData *models.Transaction) error {
	return s.repository.UpdateTransaction(userID, transactionID, updatedData)
}

func (s *Service) DeleteTransaction(userID, transactionID primitive.ObjectID) error {
	return s.repository.DeleteTransaction(userID, transactionID)
}
