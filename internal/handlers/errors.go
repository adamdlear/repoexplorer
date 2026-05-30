package handlers

import (
	"errors"
	"log/slog"

	"github.com/gofiber/fiber/v3"
)

func ErrorHandler(c fiber.Ctx, err error) error {
	code := fiber.StatusInternalServerError

	var fiberErr *fiber.Error
	if errors.As(err, &fiberErr) {
		code = fiberErr.Code
	}

	slog.Error("request failed",
		"method", c.Method(),
		"path", c.Path(),
		"status", code,
		"err", err.Error(),
	)

	return c.Status(code).JSON(fiber.Map{"error": err.Error()})
}
