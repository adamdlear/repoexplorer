package colors

import (
	_ "embed"
	"encoding/json"
	"log"
	"strings"
)

//go:embed colors.json
var data []byte

type entry struct {
	Color string `json:"color"`
}

// index is a normalized (lowercase) map for case-insensitive lookup.
var index map[string]string

func init() {
	var raw map[string]entry
	if err := json.Unmarshal(data, &raw); err != nil {
		log.Fatalf("colors: failed to parse colors.json: %v", err)
	}
	index = make(map[string]string, len(raw))
	for lang, e := range raw {
		index[strings.ToLower(lang)] = e.Color
	}
}

// GetColor returns the hex color for the given language name, or an empty
// string if the language is unknown. The lookup is case-insensitive.
func GetColor(language string) string {
	return index[strings.ToLower(language)]
}
