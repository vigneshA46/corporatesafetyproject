// src/components/GlobalLocationChecker.jsx
import { useEffect } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";

const GlobalLocationChecker = () => {
    useEffect(() => {
        const interval = setInterval(async () => {
          try {
            const response = await axios.post("http://localhost:3000/check-office-leave");
            console.log("Raw response:", response.data);
      
            const data = response.data.notifications;
      
            if (Array.isArray(data)) {
              data.forEach((note) => {
                notifications.show({
                  title: "Location Alert",
                  message: note.message,
                  color: "orange",
                });
              });
            } else if (response.data.message) {
              // Show as notification even if it's a single message
              notifications.show({
                title: "Info",
                message: response.data.message,
                color: "blue",
              });
            }
      
          } catch (err) {
            console.error("Location check error:", err);
          }
        }, 10000); // 1 minute
      
        return () => clearInterval(interval);
      }, []);
      
      

  return null; // No UI
};

export default GlobalLocationChecker;
