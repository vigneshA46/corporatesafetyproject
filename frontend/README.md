# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




//usernames , passwords and roles

associate - associate - associate
manager - manager - manager
executive - executive - executive
admin - admin - admin


// Check office leave route
router.post("/check-office-leave", (req, res) => {
  if (!isWorkingHours()) return res.json({ message: "Outside working hours." });

  const query = `SELECT userId, latitude, longitude FROM location ORDER BY timestamp DESC`;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });

    const latest = {};
    for (const row of rows) {
      if (!latest[row.userId]) latest[row.userId] = row;
    }

    const notifications = [];

    // Check if employees are inside the office during working hours
    for (const userId in latest) {
      const { latitude, longitude } = latest[userId];
      const distance = getDistanceFromLatLonInKm(latitude, longitude, OFFICE_LAT, OFFICE_LNG);

      if (distance > 0.1) {
        notifications.push({
          userId,
          message: `🚨 ALERT: Employee ${userId} left office during working hours.`
        });
      }
    }

    res.json({ notifications });
  });
});