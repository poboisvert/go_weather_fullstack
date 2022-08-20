package repository

import (
	"net/http"

	"github.com/poboisvert/go_weather_fullstack/server/database/migrations"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/morkid/paginate"
	"github.com/poboisvert/go_weather_fullstack/server/database/models"
)


type ErrorResponse struct {
	FailedField string
	Tag string
	Value string
}
var validate = validator.New()

func ValidateStruct(weather models.Weather) []*ErrorResponse{
	var errors []*ErrorResponse
	err := validate.Struct(weather)

	if err != nil {
		for _, err := range err.(validator.ValidationErrors){
			var element ErrorResponse
			element.FailedField = err.StructNamespace()
			element.Tag = err.Tag()
			element.Value = err.Param()
			errors = append(errors, &element)
		}
	}

	return errors
}

func (r *Repository) GetWeather(context *fiber.Ctx) error {
	db := r.DB
	model := db.Model(&migrations.Weather{})

	pg :=paginate.New(&paginate.Config{
		DefaultSize:20,
		CustomParamEnabled: true,
	})

	page:= pg.With(model).Request(context.Request()).Response(&[]migrations.Weather{})

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"data": page,
	})
	return nil
}

func(r *Repository) CreateWeather(context *fiber.Ctx) error {
	weather := models.Weather{}
	err := context.BodyParser(&weather)

	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "No Go"})

		return err
	}

	errors := ValidateStruct(weather)
	if errors != nil {
		return context.Status(fiber.StatusBadRequest).JSON(errors)
	}
	
	if errors != nil {
		return context.Status(fiber.StatusBadRequest).JSON(errors)
	}

	if err :=r.DB.Create(&weather).Error; err != nil {
		return context.Status(http.StatusBadRequest).JSON(fiber.Map{"status": "Error", "message": "code bug","data": err})
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{"message":"User has beencreated", "data": weather})

	return nil
}

func(r *Repository) UpdateWeather(context *fiber.Ctx) error {
	weather := models.Weather{}
	err := context.BodyParser(&weather)

	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "No Go"})

		return err
	}

	errors := ValidateStruct(weather)
	if errors != nil {
		return context.Status(fiber.StatusBadRequest).JSON(errors)
	}

	db := r.DB
	id := context.Params("id")

	if id == "" {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{"message":"Bad Request"})
		return nil
	}

	if db.Model(&weather).Where("id = ?", id).Updates(&weather).RowsAffected == 0 {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{"message":"Bad Request"})
		return nil
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{"status":"success", "message":"User is updated"})
	return nil

}

func(r *Repository) DeleteWeather(context *fiber.Ctx) error {

	weatherModel := migrations.Weather{}
	id := context.Params("id")

	if id == "" {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{"message":"Bad Request"})
		return nil
	}

	err := r.DB.Delete(weatherModel, id)

	if err.Error != nil {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{"message":"Bad Request"})
		return err.Error
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{"status":"success", "message":"User is updated"})
	return nil
}


func (r *Repository) GetWeatherByID(context *fiber.Ctx) error {

	id := context.Params("id")
	weatherModel := &migrations.Weather{}

	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{"message":"Bad Request"})
		return nil
	}

	err := r.DB.Where("id = ?", id).First(weatherModel).Error

	if err != nil {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{"message":"Bad Request"})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{"status":"success", "message": "User ID has been found", "data": weatherModel})
	return nil
}

