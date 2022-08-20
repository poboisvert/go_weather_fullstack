package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/poboisvert/go_weather_fullstack/server/bootstrap"
	"github.com/poboisvert/go_weather_fullstack/server/repository"
)

type Repository repository.Repository

func main() {
	app := fiber.New()
	bootstrap.InitializeApp(app)
}