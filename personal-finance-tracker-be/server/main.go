package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"personal-finance-tracker-be/connection"
	"personal-finance-tracker-be/repository"
	"personal-finance-tracker-be/resolvers"
	"personal-finance-tracker-be/routes"
	"personal-finance-tracker-be/service"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

var (
	httpPort    = flag.Int("httpPort", 8080, "The server port")
	connections *connection.Connection
)

func main() {
	// Parse command-line flags
	flag.Parse()

	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Retrieve environment variables
	dbUsername := os.Getenv("DB_USERNAME")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbName := os.Getenv("DB_NAME")

	// Validate required environment variables
	if dbUsername == "" || dbPassword == "" || dbHost == "" || dbName == "" {
		log.Fatalf("One or more required environment variables are missing: DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME")
	}

	// Initialize MongoDB connection
	mongoClient := connection.ConnectMongoDB(dbUsername, dbPassword, dbHost, dbName)
	connections = connection.NewConnection(mongoClient)

	// Create repository and resolver instances
	dbRepository := repository.NewRepository(connections)

	newService := service.NewService(dbRepository)

	resolver := resolvers.NewResolver(dbRepository, newService)

	// Initialize Gin router
	r := gin.Default()

	routes := routes.NewRoutes(resolver)
	routes.RegisterRoutes(r)

	// Run the server on the specified port
	port := fmt.Sprintf(":%d", *httpPort) // Convert port number to string with colon prefix
	if err := r.Run(port); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
