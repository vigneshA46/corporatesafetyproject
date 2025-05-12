import { useEffect } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { disasternotification } from "./disasternotification";

const GlobalLocationChecker = () => {
  
  useEffect(() => {
    const callDisasterAlert = async () => {
      try {
        const response = await axios.post("http://localhost:3000/disaster-alert");
        const data = response.data;

        if (data.disasterFound && Array.isArray(data.alerts)) {
  data.alerts.forEach((alert) => {
    disasternotification(alert.alert);
  });
}

      } catch (err) {
        console.error("Disaster check error:", err);
      }
    };

    const callOfficeLeaveCheck = async () => {
      try {
        const response = await axios.post("http://localhost:3000/check-office-leave");
        const data = response.data;

        if (Array.isArray(data.notifications)) {
          data.notifications.forEach((note) => {
            notifications.show({
              title: "Location Alert",
              message: note.message,
              color: "orange",
            });
          });
        } else if (data.message) {
          notifications.show({
            title: "Info",
            message: data.message,
            color: "blue",
          });
        }
      } catch (err) {
        console.error("Location check error:", err);
      }
    };

    // 🔁 Initial call on mount
    callDisasterAlert();
    callOfficeLeaveCheck();

    // ⏱️ Disaster check every 10 seconds
    const disasterInterval = setInterval(callDisasterAlert, 10000);

    // ⏱️ Office leave check every 60 seconds
    const officeLeaveInterval = setInterval(callOfficeLeaveCheck, 60000);

    return () => {
      clearInterval(disasterInterval);
      clearInterval(officeLeaveInterval);
    };
  }, []);

  return null;
};

export default GlobalLocationChecker;
