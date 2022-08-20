package models

type Weather struct {
	Title    		string `json:"title" validate:"omitempty,min=5,max=100"`
	Email   		string `json:"email" validate:"required,email,min=5,max=100"`
	Date    		string `json:"date" validate:"required"`
	Prediction    	string `json:"prediction" validate:"required,min=1,max=5"`
	City    		string `json:"city" validate:"required,min=5,max=100"`
	Country 		string `json:"country" validate:"required,min=5,max=100"`
}