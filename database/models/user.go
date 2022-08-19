package models

type User struct {
	Name string `json:"name" validate:"required, min=3, max=50"`
	Email string `json:"email" validate:"required, min=5, max=50"`
	Date string `json:"Date" validate:"required"`
	City string `json:"city" validate:"required"`
	Country string `json:"country" validate:"required"`
}