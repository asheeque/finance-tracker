package routes

import "github.com/gin-gonic/gin"

// RegisterPublicUserRoutes defines public user-related routes
func (r *Routes) RegisterPublicUserRoutes(group *gin.RouterGroup) {
	group.POST("/user", r.resolver.CreateUser)
	group.POST("/user/login", r.resolver.LoginUser)
}

// RegisterProtectedUserRoutes defines protected user-related routes
func (r *Routes) RegisterProtectedUserRoutes(group *gin.RouterGroup) {
	group.GET("/user", r.resolver.GetUser)
	group.PATCH("/user", r.resolver.UpdateUser)
}
