package routes

import (
	"personal-finance-tracker-be/middleware"
	"personal-finance-tracker-be/resolvers"

	"github.com/gin-gonic/gin"
)

type Routes struct {
	resolver *resolvers.Resolver
}

// NewRoutes initializes the Routes struct with a Resolver
func NewRoutes(resolver *resolvers.Resolver) *Routes {
	return &Routes{
		resolver: resolver,
	}
}

// RegisterRoutes registers all routes
func (r *Routes) RegisterRoutes(router *gin.Engine) {

	router.Use(middleware.CorsMiddleware())

	// Public routes
	public := router.Group("/")
	r.RegisterPublicUserRoutes(public)

	// Protected routes
	protected := router.Group("/")
	protected.Use(middleware.JWTMiddlewareGin())
	r.RegisterProtectedUserRoutes(protected)
	r.RegisterTransactionRoutes(protected)
}
