package repository

import "github.com/gofiber/fiber/v2"

func (repo *Repository) SetupRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Get("/weathers", repo.GetWeather)
	api.Post("/weathers", repo.CreateWeather)
	api.Patch("/weathers/:id", repo.UpdateWeather)
	api.Delete("/weathers/:id", repo.DeleteWeather)
	api.Get("/weathers/:id", repo.GetWeatherByID)


}