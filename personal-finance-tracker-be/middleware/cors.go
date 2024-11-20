package middleware

import (
	"os"

	"github.com/gin-gonic/gin"
)

// CORS middleware for Gin
func CorsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Set CORS headers
		allowedOrigin := os.Getenv("ALLOWED_ORIGIN")
		if allowedOrigin == "" {
			allowedOrigin = "*" // Allow all origins as a fallback (not recommended for production)
		}
		c.Writer.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Handle preflight requests
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
			return
		}

		// Proceed to the next middleware/handler
		c.Next()
	}
}
