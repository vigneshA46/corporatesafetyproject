import { useEffect } from "react";
import axios from "axios";

const TRACKING_INTERVAL = 5 * 60 * 1000; // every 5 minutes

function LocationTracker({ userId }) {
  useEffect(() => {
    const trackLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Location:", latitude, longitude);

          // Send to backend
           await axios.post("http://localhost:3000/location", {
            userId,
            latitude,
            longitude,
          }); 
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    trackLocation(); // initial
    const interval = setInterval(trackLocation, TRACKING_INTERVAL); // repeat

    return () => clearInterval(interval); // cleanup
  }, [userId]);

  return null;// no UI, just runs
}

export default LocationTracker;
