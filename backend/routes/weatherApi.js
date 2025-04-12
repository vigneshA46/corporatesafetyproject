const express = require("express");
const axios = require("axios");

const router = express.Router();
const API_KEY = "214a09fd9e484e339c1154925251303";
const LOCATION = "Chennai,IN";

router.get("/weather", async (req, res) => {
  try {
    const response = await axios.get(
           "https://api.weatherapi.com/v1/current.json?key=214a09fd9e484e339c1154925251303&q=chennai&aqi=no",
           {
            headers: {
              "User-Agent": "Mozilla/5.0",
            },
          }
    );
    console.log(response);
    res.json(response.data);
  } catch (error) {
    console.log("Weather API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});


module.exports = router;
