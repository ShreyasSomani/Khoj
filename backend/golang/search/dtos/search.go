package dtos

type Product struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	SalePrice   float64 `json:"sale_price"`
	MarketPrice float64 `json:"market_price"`
	Type        string  `json:"type"`
	Quantity    int     `json:"quantity"`
	Category    string  `json:"category"`
	SubCategory string  `json:"sub_category"`
	Brand       string  `json:"brand"`
	Rating      float64 `json:"rating"`
	ImageUrl    string  `json:"image_url"`
	ProductUrl  string  `json:"product_url"`
	IsAvailable bool    `json:"is_available"`
}
