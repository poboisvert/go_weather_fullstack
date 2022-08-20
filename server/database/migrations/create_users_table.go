package migrations

import (
	"time"

	"gorm.io/gorm"
)

type Weather struct {
	ID uint `gorm:"primary key;autoIncrement" json: "id"`
	Title *string `json:"title"`
	Email *string `json:"email"`
	Prediction *string `json:"prediction"`
	Date *time.Time `json:"Date"`
	City *string `json:"city"`
	Country *string `json:"country"`
}

func MigrateUsers(db *gorm.DB) error {
	err := db.AutoMigrate(&Weather{})
	return err
}