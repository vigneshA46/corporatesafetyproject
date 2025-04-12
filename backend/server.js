const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const signupROute = require('./routes/signupRoute');
const login = require('./routes/login')
const cors = require('cors');
const weatherapi = require('./routes/weatherApi')
const userdata = require('./routes/userdata');
const updateuser = require('./routes/updateuser');
const user = require('./routes/specifiuser');
const deleteuser = require('./routes/deleteuser');
const reportapi = require('./routes/reportapi');
const getreports = require('./routes/getreports');
const dashboarddata = require('./routes/dashboarddata');
const sendemails = require('./routes/sendemail');
const app = express();
const PORT = 3000;
app.use(cors({
    origin: 'http://localhost:5173',   // React frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }))
app.use(express.json());


// Connect to SQLite database
const db = new sqlite3.Database("./corporatedatabase.db", (err) => {
    if (err) {
        console.error("Error connecting to SQLite database:", err.message);
    } else {
        console.log("Connected to the SQLite database successfully!");
        console.log("Database file path:", require("path").resolve("./corporatedatabase.db"));

    }
});

// Test route
app.get("/", (req, res) => {
    db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, tables) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Connection successful!", tables });
    });
});

//creating the user table
const createusertable = `CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL
);`



db.run(createusertable, (err) => {
    if (err) {
        console.error("Error creating 'user' table:", err.message);
    } else {
        console.log("'user' table created successfully.");
    }
});

app.use('/api',signupROute);
app.use('/login',login);
app.use('/userdata',userdata);
app.use("/api", weatherapi);
app.use("/",updateuser);
app.use("/",user);
app.use("/",deleteuser);
app.use("/",reportapi);
app.use("/",getreports);
app.use("/",dashboarddata);
app.use("/",sendemails);


// Close the database connection on exit
process.on("SIGINT", () => {
    db.close(() => {
        console.log("SQLite database connection closed.");
        process.exit(0);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
