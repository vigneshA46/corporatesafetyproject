import { useEffect } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { checkSafetyLevels } from "./safetyCheck";
import {useAlarm} from "../components/useAlarm"
const GlobalLocationChecker = () => {
  const {playAlarm,stopAlarm} = useAlarm();
  useEffect(() => {
    const runInitialChecks = async () => {
      await checkOfficeLeave();
      await checkDisaster();
      await checkSafetyLevels();
    };

    runInitialChecks();

    const disasterInterval = setInterval(() => {
      checkDisaster();
    }, 60000);

    const officeLeaveInterval = setInterval(() => {
      checkOfficeLeave();
    }, 60000);

    const safetyInterval = setInterval(() => {
      checkSafetyLevels();
    }, 60000); // every 1 min

    return () => {
      clearInterval(disasterInterval);
      clearInterval(officeLeaveInterval);
      clearInterval(safetyInterval);
    };
  }, []);

  const checkOfficeLeave = async () => {
    try {
      const res = await axios.post("http://localhost:3000/check-office-leave");
      if (Array.isArray(res.data.notifications)) {
        res.data.notifications.forEach((note) => {
          notifications.show({
            title: "Location Alert",
            message: note.message,
            color: "orange",
          });
        });
      } else if (res.data.message) {
        notifications.show({
          title: "Info",
          message: res.data.message,
          color: "blue",
        });
      }
    } catch (err) {
      console.error("Office leave check error:", err);
    }
  };

 const checkDisaster = async () => {
  try {
    const res = await axios.post("http://localhost:3000/disaster-alert");

    if (Array.isArray(res.data.alerts)) {
      for (const alert of res.data.alerts) {
        // 1. Show UI Notification
        notifications.show({
          title: "Disaster Alert",
          message: alert.alert,
          color: "red",
          autoClose: false,
        });


        // 2. Send Email Notification
        await axios.post("http://localhost:3000/send-alert-mail", {
          subject: "🚨 Disaster Alert: Urgent Attention Needed",
          message: "eacuate immedietly disaster is happenin...",
        });
      }
    }
  } catch (err) {
    console.error("Disaster check or mail error:", err);
  }
};

  return null;
};

export default GlobalLocationChecker;
