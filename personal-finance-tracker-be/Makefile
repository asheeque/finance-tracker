# Variables
GO := go
APP_NAME := go-gin-app

# Default target
.PHONY: all
all: run

# Run the application
.PHONY: run
run:
	@echo "Running the application..."
	$(GO) run server/main.go

# Tidy up Go modules
.PHONY: tidy
tidy:
	@echo "Tidying up Go modules..."
	$(GO) mod tidy

# Build the application
.PHONY: build
build:
	@echo "Building the application..."
	$(GO) build -o $(APP_NAME) server/main.go

# Test the application
.PHONY: test
test:
	@echo "Running tests..."
	$(GO) test ./...

# Clean the build
.PHONY: clean
clean:
	@echo "Cleaning up..."
	rm -f $(APP_NAME)
