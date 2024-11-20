package repository

import (
	"os"
	"personal-finance-tracker-be/connection"

	"go.mongodb.org/mongo-driver/mongo"
)

type Repository struct {
	connections        *connection.Connection
	userCollRef        *mongo.Collection
	transactionCollRef *mongo.Collection
}

func NewRepository(connections *connection.Connection) *Repository {
	mdbName := os.Getenv("DB_NAME")
	userColl := os.Getenv("USER_COLLECTION")
	usercollection := connections.Mongo.Database(mdbName).Collection(userColl)
	transactionColl := os.Getenv("TRANSACTION_COLLECTION")
	transactioncollection := connections.Mongo.Database(mdbName).Collection(transactionColl)
	connection.CreateUniqueEmailIndex(usercollection)
	return &Repository{
		connections:        connections,
		userCollRef:        usercollection,
		transactionCollRef: transactioncollection,
	}
}
