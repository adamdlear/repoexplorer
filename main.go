package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v3"
	"github.com/google/go-github/v85/github"
	"github.com/joho/godotenv"
)

func init() {
	if err := godotenv.Load(); err != nil {
		log.Print("No .env file found")
	}
}

func main() {
	githubToken := os.Getenv("GITHUB_TOKEN")
	githubClient := github.NewClient(nil).WithAuthToken(githubToken)

	app := fiber.New()

	api := app.Group("/api")
	api.Get("/repos", func(c fiber.Ctx) error {
		repos, _, err := githubClient.Repositories.ListAll(c, nil)
		if err != nil {
			fiber.NewError(fiber.StatusInternalServerError, "could not fetch reps")
		}
		return c.JSON(repos)
	})

	app.Listen(":3000")
}
