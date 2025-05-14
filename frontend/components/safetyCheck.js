import axios from "axios";
import { notifications } from "@mantine/notifications";

export async function checkSafetyLevels() {
  try {
    const response = await axios.get("http://localhost:3000/safety-alert");
    const alerts = response.data.alerts;

    if (Array.isArray(alerts) && alerts.length > 0) {
      alerts.forEach((msg) => {
        notifications.show({
          title: "Environmental Alert",
          message: msg,
          color: "red",
          autoClose: false, // stays longer
          withCloseButton: true,
        });
      });
    }
  } catch (err) {
    console.error("Safety check error:", err);
  }
}
