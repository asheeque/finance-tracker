package connection

import (
	"go.mongodb.org/mongo-driver/mongo"
)

type Connection struct {
	Mongo *mongo.Client
}

func NewConnection(mongoConn *mongo.Client) *Connection {
	return &Connection{
		Mongo: mongoConn,
	}
}
