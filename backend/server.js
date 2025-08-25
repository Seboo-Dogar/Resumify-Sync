require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Connect to MongoDB
connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// Serve static files
app.use("/upload", express.static(path.join(__dirname, "uploads"),{
    setHeaders: function (res, path) {
        res.set("Access-Control-Allow-Origin", "http://localhost:5173");
    }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);
});

