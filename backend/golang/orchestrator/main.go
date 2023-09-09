package main

// API to accept image and return product details

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"gopkg.in/olivere/elastic.v5"
)

// Elasticsearch configuration
const (
	elasticsearchURL   = "http://localhost:9200"
	elasticsearchIndex = "product-index"
)

type Product struct {
	ID          int64   `json:"index_id"`
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
	Description string  `json:"description"`
	IsAvailable bool    `json:"is_available"`
}

type Request struct {
	ImageUrl string `json:"image_url"`
}

type Dish struct {
	Name     string   `json:"name"`
	Recipe   string   `json:"recipe"`
	Keywords []string `json:"keywords"` // Ingredients
}

type Response struct {
	Dishes   map[string]Dish `json:"dishes"`
	Products []Product       `json:"products"`
}

func main() {
	// Initialize the Elasticsearch client
	client, err := elastic.NewClient(elastic.SetURL(elasticsearchURL), elastic.SetSniff(false))
	if err != nil {
		log.Fatalf("Error creating Elasticsearch client: %v", err)
	}

	// Create an HTTP handler to search for documents in Elasticsearch
	http.HandleFunc("/search", func(w http.ResponseWriter, r *http.Request) {
		// Parse the query string
		q := r.URL.Query().Get("query")
		if q == "" {
			http.Error(w, "Query string parameter 'query' is required", http.StatusBadRequest)
			return
		}

		log.Printf("Query string: %s\n", q)

		// Create an Elasticsearch context
		ctx := context.Background()

		// Search for the query string in the "title" and "text" fields
		query := elastic.NewMultiMatchQuery(q, "name", "category", "sub_category", "brand", "type")

		log.Printf("Query: %v\n", query)
		// Execute the search request
		res, err := client.Search().
			Index(elasticsearchIndex).
			Query(query).
			Do(ctx)
		if err != nil {
			http.Error(w, fmt.Sprintf("Error executing search: %v", err), http.StatusInternalServerError)
			return
		}

		var product Product
		var products []Product

		// Return search results
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		for _, hit := range res.Hits.Hits {
			err := json.Unmarshal(*hit.Source, &product)
			if err != nil {
				fmt.Printf("Error unmarshalling product: %v\n", err)
				return
			}
			products = append(products, product)
		}
		json.NewEncoder(w).Encode(products)

	})

	// Start the HTTP server
	fmt.Println("Server listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
