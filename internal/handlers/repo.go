package handlers

import (
	"strconv"

	"github.com/gofiber/fiber/v3"
	"github.com/google/go-github/v85/github"
)

type RepoHandler struct {
	github *github.Client
}

func NewRepoHandler(github *github.Client) *RepoHandler {
	return &RepoHandler{
		github: github,
	}
}

func (h *RepoHandler) ListRepos(c fiber.Ctx) error {
	repos, _, err := h.github.Repositories.ListAll(c.Context(), nil)
	if err != nil {
		return fiber.NewError(500, "could not list repos")
	}
	return c.JSON(repos)
}

func (h *RepoHandler) GetRepo(c fiber.Ctx) error {
	param := c.Params("id")
	id, err := strconv.ParseInt(param, 10, 64)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "failed to parse id param")
	}
	repo, _, err := h.github.Repositories.GetByID(c, id)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "failed to get repo")
	}
	return c.JSON(repo)
}
