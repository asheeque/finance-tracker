package resolvers

import (
	"personal-finance-tracker-be/repository"
	"personal-finance-tracker-be/service"
)

type Resolver struct {
	repository *repository.Repository
	service    *service.Service
}

func NewResolver(dbrepository *repository.Repository, newService *service.Service) *Resolver {
	return &Resolver{
		repository: dbrepository,
		service:    newService,
	}
}
