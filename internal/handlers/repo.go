package handlers

import (
	"strconv"

	"github.com/adamdlear/repoexplorer/internal/colors"
	"github.com/gofiber/fiber/v3"
	"github.com/google/go-github/v85/github"
)

type repoWithColor struct {
	*github.Repository
	LanguageColor string `json:"language_color"`
}

type searchResult struct {
	TotalCount        *int            `json:"total_count"`
	IncompleteResults *bool           `json:"incomplete_results"`
	Items             []repoWithColor `json:"items"`
}

func withColor(r *github.Repository) repoWithColor {
	lang := r.GetLanguage()
	return repoWithColor{Repository: r, LanguageColor: colors.GetColor(lang)}
}

type RepoHandler struct {
	github *github.Client
}

func NewRepoHandler(github *github.Client) *RepoHandler {
	return &RepoHandler{
		github: github,
	}
}

func (h *RepoHandler) ListRepos(c fiber.Ctx) error {
	page := 1
	if p := c.Query("page"); p != "" {
		if parsed, err := strconv.Atoi(p); err == nil && parsed > 0 {
			page = parsed
		}
	}

	opts := &github.SearchOptions{
		Sort:  "stars",
		Order: "desc",
		ListOptions: github.ListOptions{
			Page:    page,
			PerPage: 30,
		},
	}

	repos, _, err := h.github.Search.Repositories(c, "stars:>1", opts)
	if err != nil {
		return fiber.NewErrorf(fiber.StatusInternalServerError, "failed to fetch repos: %v", err)
	}

	items := make([]repoWithColor, len(repos.Repositories))
	for i, r := range repos.Repositories {
		items[i] = withColor(r)
	}
	return c.JSON(searchResult{
		TotalCount:        repos.Total,
		IncompleteResults: repos.IncompleteResults,
		Items:             items,
	})
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
	return c.JSON(withColor(repo))
}
