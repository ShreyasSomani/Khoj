package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"dtos"

	"gopkg.in/olivere/elastic.v5"
)

// Elasticsearch configuration
const (
	elasticsearchURL   = "http://localhost:9200"
	elasticsearchIndex = "product-index"
)

func main() {
	// Initialize the Elasticsearch client
	client, err := elastic.NewClient(elastic.SetURL(elasticsearchURL))
	if err != nil {
		log.Fatalf("Error creating Elasticsearch client: %v", err)
	}

	// Create an HTTP handler to insert multiple documents into Elasticsearch
	http.HandleFunc("/insertMany", func(w http.ResponseWriter, r *http.Request) {
		// Parse the request body into a slice of Document structs
		var docs []dtos.Product
		if err := json.NewDecoder(r.Body).Decode(&docs); err != nil {
			http.Error(w, fmt.Sprintf("Error decoding JSON: %v", err), http.StatusBadRequest)
			return
		}

		// Create an Elasticsearch context
		ctx := context.Background()

		// Use the Bulk API to insert multiple documents in a single request
		bulk := client.Bulk()
		for _, doc := range docs {
			req := elastic.NewBulkIndexRequest().Index(elasticsearchIndex).Type("_doc").Doc(doc)
			bulk = bulk.Add(req)
		}

		_, err := bulk.Do(ctx)
		if err != nil {
			http.Error(w, fmt.Sprintf("Error indexing documents: %v", err), http.StatusInternalServerError)
			return
		}

		// Respond with a success message
		w.WriteHeader(http.StatusCreated)
		fmt.Fprintln(w, "Documents indexed successfully")
	})

	// Start the HTTP server
	fmt.Println("Server listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
