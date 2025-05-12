import { notifications } from "@mantine/notifications";

export function disasternotification(message) {
  notifications.show({
    title: "🔴 URGENT: Disaster Alert",
    message,
    color: "red",
    autoClose: 150000, // 15 seconds
    withCloseButton: true,
    styles: {
      root: {
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
  });
}
