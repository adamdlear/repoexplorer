package main

import (
	"embed"
	"io/fs"
	"log"
	"os"

	"github.com/adamdlear/repoexplorer/internal/handlers"
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/static"
	"github.com/google/go-github/v85/github"
	"github.com/joho/godotenv"
)

//go:embed all:web/dist
var staticFiles embed.FS

func init() {
	if err := godotenv.Load(); err != nil {
		log.Print("No .env file found")
	}
}

func main() {
	token := os.Getenv("GITHUB_TOKEN")
	gh := github.NewClient(nil).WithAuthToken(token)

	repoHandler := handlers.NewRepoHandler(gh)

	app := fiber.New()

	api := app.Group("/api")
	api.Get("/repos", repoHandler.ListRepos)
	api.Get("/repos/:id", repoHandler.GetRepo)

	distFS, _ := fs.Sub(staticFiles, "web/dist")
	app.Use("/", static.New("", static.Config{
		FS: distFS,
	}))

	app.Listen(":3000")
}
