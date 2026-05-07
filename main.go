package main

import "github.com/gofiber/fiber/v3"

func main() {
	api := fiber.New()
	api.Get("/", func(c fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	app := fiber.New()
	app.Use("/api", api)
	app.Listen(":3000")
}
