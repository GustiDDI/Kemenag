package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/neo4j/neo4j-go-driver/v5/neo4j"
)

func main() {
	// Initialize Neo4j driver and session (replace with your credentials)
	dbUri := "neo4j://192.168.18.191:7687"
	dbUser := "neo4j"
	dbPassword := "ddi123"
	dbName := "kemenag"
	dbFullUri := dbUri + "/" + dbName

	driver, err := neo4j.NewDriver(
		dbFullUri,
		neo4j.BasicAuth(dbUser, dbPassword, ""),
	)
	if err != nil {
		log.Fatal(err)
	}
	defer driver.Close()

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},  // Add the origin of your frontend
		AllowMethods: []string{"GET", "POST", "OPTIONS"}, // Allow the HTTP methods you need
		AllowHeaders: []string{"Origin", "Content-Type", "Accept", "Authorization"},
	}))

	r.GET("/api/data", func(c *gin.Context) {
		session := driver.NewSession(neo4j.SessionConfig{AccessMode: neo4j.AccessModeRead, DatabaseName: dbName})
		defer session.Close()

		query := `
            MATCH (j:Jemaah)-[:HAS_FAMILY]->(f:Family)
            MATCH (j)-[:HAS_MEDICAL_RECORD]->(m:Medical_Record)
            MATCH (j)-[:FROM]->(e:Embarkasi)-[:IN_KLOTER]->(k:Kloter)
            RETURN j.ktp AS ktp, j.gender AS gender,j.status AS status, j.latitude AS latitude, j.longitude AS longitude, j.nama AS nama, j.passport AS passport_jemaah, j.umur AS umur, f.status_keluarga AS status_keluarga, f.phone AS phone, m.riwayat_penyakit AS riwayat_penyakit, m.alergi AS alergi, e.name AS emberkasi_name, k.no_kloter AS no_kloter
        `
		parameters := map[string]interface{}{}
		result, err := session.Run(query, parameters)
		if err != nil {
			log.Fatal(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
			return
		}

		var data []map[string]interface{}

		for result.Next() {
			record := result.Record()
			dataItem := make(map[string]interface{})

			// Check and assign each property individually
			if value, found := record.Get("ktp"); found {
				dataItem["ktp"] = value
			} else {
				dataItem["ktp"] = nil // or handle the missing value as needed
			}

			if value, found := record.Get("nama"); found {
				dataItem["nama"] = value
			} else {
				dataItem["nama"] = nil
			}

			if value, found := record.Get("gender"); found {
				dataItem["gender"] = value
			} else {
				dataItem["gender"] = nil
			}

			if value, found := record.Get("status"); found {
				dataItem["status"] = value
			} else {
				dataItem["status"] = nil
			}

			if value, found := record.Get("latitude"); found {
				dataItem["latitude"] = value
			} else {
				dataItem["latitude"] = nil
			}

			if value, found := record.Get("longitude"); found {
				dataItem["longitude"] = value
			} else {
				dataItem["longitude"] = nil
			}

			if value, found := record.Get("passport_jemaah"); found {
				dataItem["passport_jemaah"] = value
			} else {
				dataItem["passport_jemaah"] = nil
			}

			if value, found := record.Get("umur"); found {
				dataItem["umur"] = value
			} else {
				dataItem["umur"] = nil
			}

			if value, found := record.Get("status_keluarga"); found {
				dataItem["status_keluarga"] = value
			} else {
				dataItem["status_keluarga"] = nil
			}

			if value, found := record.Get("phone"); found {
				dataItem["phone"] = value
			} else {
				dataItem["phone"] = nil
			}

			if value, found := record.Get("riwayat_penyakit"); found {
				dataItem["riwayat_penyakit"] = value
			} else {
				dataItem["riwayat_penyakit"] = nil
			}

			if value, found := record.Get("alergi"); found {
				dataItem["alergi"] = value
			} else {
				dataItem["alergi"] = nil
			}

			if value, found := record.Get("emberkasi_name"); found {
				dataItem["emberkasi_name"] = value
			} else {
				dataItem["emberkasi_name"] = nil
			}

			if value, found := record.Get("no_kloter"); found {
				dataItem["no_kloter"] = value
			} else {
				dataItem["no_kloter"] = nil
			}

			// Repeat the same pattern for other properties...

			data = append(data, dataItem)
		}

		c.JSON(http.StatusOK, gin.H{"data": data})
	})

	fmt.Println("Server listening on :8080...")
	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
