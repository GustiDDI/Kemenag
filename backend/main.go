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
			MATCH (j)-[:HAS_TOUR_TRAVEL]->(t:Tour_Travel)
			MATCH (j)-[:STAY_AT]->(h:Hotel)
            RETURN j.ktp AS ktp, j.gender AS gender,j.status AS status, j.latitude AS latitude, j.longitude AS longitude, j.nama AS nama, 
			j.passport AS passport_jemaah, j.umur AS umur, j.heart_rate as heart_rate,j.oxygen_level as oxygen_level,
			j.blood_pressure as blood_pressure,j.temperature as temperature,j.medical_condition as medical_condition, 
			f.status_keluarga AS status_keluarga, f.phone AS phone, m.riwayat_penyakit AS riwayat_penyakit, m.alergi AS alergi, 
			e.name AS emberkasi_name, k.no_kloter AS no_kloter, t.name as travel_name,h.kota as kota, h.latitude as hotel_latitude,
			h.longitude as hotel_longitude, h.nama_hotel as nama_hotel, h.sektor as sektor
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

			if value, found := record.Get("heart_rate"); found {
				dataItem["heart_rate"] = value
			} else {
				dataItem["heart_rate"] = nil
			}

			if value, found := record.Get("oxygen_level"); found {
				dataItem["oxygen_level"] = value
			} else {
				dataItem["oxygen_level"] = nil
			}

			if value, found := record.Get("temperature"); found {
				dataItem["temperature"] = value
			} else {
				dataItem["temperature"] = nil
			}

			if value, found := record.Get("medical_condition"); found {
				dataItem["medical_condition"] = value
			} else {
				dataItem["medical_condition"] = nil
			}

			if value, found := record.Get("blood_pressure"); found {
				dataItem["blood_pressure"] = value
			} else {
				dataItem["blood_pressure"] = nil
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

			if value, found := record.Get("travel_name"); found {
				dataItem["travel_name"] = value
			} else {
				dataItem["travel_name"] = nil
			}

			if value, found := record.Get("kota"); found {
				dataItem["kota"] = value
			} else {
				dataItem["kota"] = nil
			}

			if value, found := record.Get("hotel_latitude"); found {
				dataItem["hotel_latitude"] = value
			} else {
				dataItem["hotel_latitude"] = nil
			}

			if value, found := record.Get("hotel_longitude"); found {
				dataItem["hotel_longitude"] = value
			} else {
				dataItem["hotel_longitude"] = nil
			}

			if value, found := record.Get("nama_hotel"); found {
				dataItem["nama_hotel"] = value
			} else {
				dataItem["nama_hotel"] = nil
			}

			if value, found := record.Get("sektor"); found {
				dataItem["sektor"] = value
			} else {
				dataItem["sektor"] = nil
			}

			// Repeat the same pattern for other properties...

			data = append(data, dataItem)
		}

		c.JSON(http.StatusOK, gin.H{"data": data})
	})

	r.GET("/api/data/dispatch", func(c *gin.Context) {
		session := driver.NewSession(neo4j.SessionConfig{AccessMode: neo4j.AccessModeRead, DatabaseName: dbName})
		defer session.Close()

		query := `
            MATCH (n:Jemaah {nama: 'Hassan Zain'})
			MATCH (s:Dispatch)
			WITH n, s, (toInteger(n.latitude)-s.latitude)*(toInteger(n.latitude)-s.latitude)+(toInteger(n.latitude)-s.latitude)*(toInteger(n.latitude)-s.latitude) as distance
			WITH n, min(distance) as min_distance
			MATCH (s:Dispatch)
			WITH n, s, (toInteger(n.latitude)-s.latitude)*(toInteger(n.latitude)-s.latitude)+(toInteger(n.latitude)-s.latitude)*(toInteger(n.latitude)-s.latitude) as distance WHERE abs(distance-min_distance)<0.001
			RETURN s.nama_dispatch as nama_dispatch, s.latitude as dispatch_latitude,s.longitude as dispatch_longitude,s.telepon as telepon_dispatch
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
			if value, found := record.Get("nama_dispatch"); found {
				dataItem["nama_dispatch"] = value
			} else {
				dataItem["nama_dispatch"] = nil // or handle the missing value as needed
			}

			if value, found := record.Get("dispatch_latitude"); found {
				dataItem["dispatch_latitude"] = value
			} else {
				dataItem["dispatch_latitude"] = nil
			}

			if value, found := record.Get("dispatch_longitude"); found {
				dataItem["dispatch_longitude"] = value
			} else {
				dataItem["dispatch_longitude"] = nil
			}

			if value, found := record.Get("telepon_dispatch"); found {
				dataItem["telepon_dispatch"] = value
			} else {
				dataItem["telepon_dispatch"] = nil
			}

			data = append(data, dataItem)
		}

		c.JSON(http.StatusOK, gin.H{"data": data})
	})

	r.GET("/api/data/rumahsakit", func(c *gin.Context) {
		session := driver.NewSession(neo4j.SessionConfig{AccessMode: neo4j.AccessModeRead, DatabaseName: dbName})
		defer session.Close()

		query := `
            MATCH (s:Sector)<-[:IN_SECTOR]-(r:Rumah_Sakit)
            RETURN s.sector AS no_sector,
                   s.kota AS sector_kota,
                   s.latitude AS sector_latitude,
                   s.longitude AS sector_longitude,
                   r.available_icu AS available_icu,
                   r.available_room AS available_room,
                   r.kota AS kota_rumahsakit,
                   r.latitude AS rumahsakit_latitude,
                   r.longitude AS rumahsakit_longitude,
                   r.max_room AS max_room,
                   r.nama_rumahsakit AS nama_rumahsakit,
                   r.rumahSakitId AS rumahSakitId
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
			if value, found := record.Get("no_sector"); found {
				dataItem["no_sector"] = value
			} else {
				dataItem["no_sector"] = nil // or handle the missing value as needed
			}

			if value, found := record.Get("sector_kota"); found {
				dataItem["sector_kota"] = value
			} else {
				dataItem["sector_kota"] = nil
			}

			if value, found := record.Get("sector_latitude"); found {
				dataItem["sector_latitude"] = value
			} else {
				dataItem["sector_latitude"] = nil
			}

			if value, found := record.Get("sector_longitude"); found {
				dataItem["sector_longitude"] = value
			} else {
				dataItem["sector_longitude"] = nil
			}

			if value, found := record.Get("available_icu"); found {
				dataItem["available_icu"] = value
			} else {
				dataItem["available_icu"] = nil
			}

			if value, found := record.Get("available_room"); found {
				dataItem["available_room"] = value
			} else {
				dataItem["available_room"] = nil
			}

			if value, found := record.Get("kota_rumahsakit"); found {
				dataItem["kota_rumahsakit"] = value
			} else {
				dataItem["kota_rumahsakit"] = nil
			}

			if value, found := record.Get("rumahsakit_latitude"); found {
				dataItem["rumahsakit_latitude"] = value
			} else {
				dataItem["rumahsakit_latitude"] = nil
			}

			if value, found := record.Get("rumahsakit_longitude"); found {
				dataItem["rumahsakit_longitude"] = value
			} else {
				dataItem["rumahsakit_longitude"] = nil
			}

			if value, found := record.Get("max_room"); found {
				dataItem["max_room"] = value
			} else {
				dataItem["max_room"] = nil
			}

			if value, found := record.Get("nama_rumahsakit"); found {
				dataItem["nama_rumahsakit"] = value
			} else {
				dataItem["nama_rumahsakit"] = nil
			}

			if value, found := record.Get("rumahSakitId"); found {
				dataItem["rumahSakitId"] = value
			} else {
				dataItem["rumahSakitId"] = nil
			}

			data = append(data, dataItem)
		}

		c.JSON(http.StatusOK, gin.H{"data": data})
	})

	r.GET("/api/data/logistic/transport", func(c *gin.Context) {
		session := driver.NewSession(neo4j.SessionConfig{AccessMode: neo4j.AccessModeRead, DatabaseName: dbName})
		defer session.Close()

		query := `
            MATCH (n:Logistic)-[:HAS_TRANSPORT]->(t:Transport)
			RETURN n.kota as kota_logistic,t.tipe_transportasi as tipe_transportasi,sum(t.jumlah) as jumlah_transportasi
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
			if value, found := record.Get("kota_logistic"); found {
				dataItem["kota_logistic"] = value
			} else {
				dataItem["kota_logistic"] = nil // or handle the missing value as needed
			}

			if value, found := record.Get("tipe_transportasi"); found {
				dataItem["tipe_transportasi"] = value
			} else {
				dataItem["tipe_transportasi"] = nil
			}

			if value, found := record.Get("jumlah_transportasi"); found {
				dataItem["jumlah_transportasi"] = value
			} else {
				dataItem["jumlah_transportasi"] = nil
			}

			data = append(data, dataItem)
		}

		c.JSON(http.StatusOK, gin.H{"data": data})
	})

	r.GET("/api/data/logistic/akomodasi", func(c *gin.Context) {
		session := driver.NewSession(neo4j.SessionConfig{AccessMode: neo4j.AccessModeRead, DatabaseName: dbName})
		defer session.Close()

		query := `
            MATCH (n:Logistic)-[:HAS_ACCOMMODATION]->(a:Accommodation)
			RETURN n.kota as kota_logistic,a.nama_akomodasi as nama_akomodasi,sum(a.jumlah) as jumlah_akomodasi
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
			if value, found := record.Get("kota_logistic"); found {
				dataItem["kota_logistic"] = value
			} else {
				dataItem["kota_logistic"] = nil // or handle the missing value as needed
			}

			if value, found := record.Get("nama_akomodasi"); found {
				dataItem["nama_akomodasi"] = value
			} else {
				dataItem["nama_akomodasi"] = nil
			}

			if value, found := record.Get("jumlah_akomodasi"); found {
				dataItem["jumlah_akomodasi"] = value
			} else {
				dataItem["jumlah_akomodasi"] = nil
			}

			data = append(data, dataItem)
		}

		c.JSON(http.StatusOK, gin.H{"data": data})
	})

	r.GET("/api/data/logistic/konsumsi", func(c *gin.Context) {
		session := driver.NewSession(neo4j.SessionConfig{AccessMode: neo4j.AccessModeRead, DatabaseName: dbName})
		defer session.Close()

		query := `
            MATCH (n:Logistic)-[:HAS_CONSUMPTION]->(c:Consumption)
			RETURN n.kota as kota_logistic,c.nama_konsumsi as nama_konsumsi ,sum(c.jumlah_konsumsi) as jumlah_konsumsi
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
			if value, found := record.Get("kota_logistic"); found {
				dataItem["kota_logistic"] = value
			} else {
				dataItem["kota_logistic"] = nil // or handle the missing value as needed
			}

			if value, found := record.Get("nama_konsumsi"); found {
				dataItem["nama_konsumsi"] = value
			} else {
				dataItem["nama_konsumsi"] = nil
			}

			if value, found := record.Get("jumlah_konsumsi"); found {
				dataItem["jumlah_konsumsi"] = value
			} else {
				dataItem["jumlah_konsumsi"] = nil
			}

			data = append(data, dataItem)
		}

		c.JSON(http.StatusOK, gin.H{"data": data})
	})

	r.GET("/api/data/logistic/obat", func(c *gin.Context) {
		session := driver.NewSession(neo4j.SessionConfig{AccessMode: neo4j.AccessModeRead, DatabaseName: dbName})
		defer session.Close()

		query := `
            MATCH (n:Logistic)-[:HAS_MEDICINE]->(m:Medicine)
			RETURN n.kota as kota_logistic,m.nama_obat as nama_obat,sum(m.jumlah_obat) as jumlah_obat
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
			if value, found := record.Get("kota_logistic"); found {
				dataItem["kota_logistic"] = value
			} else {
				dataItem["kota_logistic"] = nil // or handle the missing value as needed
			}

			if value, found := record.Get("nama_obat"); found {
				dataItem["nama_obat"] = value
			} else {
				dataItem["nama_obat"] = nil
			}

			if value, found := record.Get("jumlah_obat"); found {
				dataItem["jumlah_obat"] = value
			} else {
				dataItem["jumlah_obat"] = nil
			}

			data = append(data, dataItem)
		}

		c.JSON(http.StatusOK, gin.H{"data": data})
	})

	fmt.Println("Server listening on :8080...")
	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
