package routes

import "github.com/gin-gonic/gin"

// RegisterTransactionRoutes defines transaction-related routes
func (r *Routes) RegisterTransactionRoutes(group *gin.RouterGroup) {
	group.POST("/transaction", r.resolver.CreateTransaction)
	group.GET("/transaction", r.resolver.GetTransactions)
	group.PATCH("/transaction/:id", r.resolver.UpdateTransaction)
	group.DELETE("/transaction/:id", r.resolver.DeleteTransaction)
}
