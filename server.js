const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config();
const dbConfig = require("./config/dbconfig");
app.use(express.json());
const userRoute = require("./routes/userRoute");
const songsRoute = require("./routes/songsRoute");
const adminRoute = require("./routes/adminRoute");

// Serve static files before defining other routes
app.use(express.static(path.resolve(__dirname, "frontend", "build")));

// Define your API routes
app.use("/api/users", userRoute);
app.use("/api/songs", songsRoute);
app.use("/api/admin", adminRoute);

// Define route handler for the root path ("/")
app.get("/", (req, res) => {
  // Send the index.html file from the build folder
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node.js server started at port ${port}!`));
