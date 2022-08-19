package bootstrap

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/poboisvert/go_weather_fullstack/database/migrations"
	"github.com/poboisvert/go_weather_fullstack/database/storage"
	"github.com/poboisvert/go_weather_fullstack/repository"
)

func InitializeApp(app *fiber.App) {
	_, ok := os.LookupEnv(".env.local")

	if !ok {
		err := godotenv.Load(".env.local")
		if err != nil {
			log.Fatal(err)
		}
	}
	config := &storage.Config{
		Host: os.Getenv("DB_HOST"),
		Port: os.Getenv("DB_PORT"),
		User: os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASSWORD"),
		SSLMode: os.Getenv("DB_SSLMODE"),
		DBName: os.Getenv("DB_NAME"),
	}

	db, err := storage.NewConnection(config)

	if err != nil{
		log.Fatal("DB Error")
	}

	err = migrations.MigrateUsers(db)

	if err != nil{
		log.Fatal("DB & Users Migrations error")
	}

	repo := repository.Repository{
		DB: db,
	}

	app.Use(cors.New(cors.Config{AllowCredentials: true}))
	repo.SetupRoutes(app)
	app.Listen(":8081")
}