const express = require("express");
const cors = require("cors");
const db = require("./db/db")
const authRoute = require("./route/auth")
const dataRoutes = require("./route/data");
const app = express();
app.use(cors());
app.use(express.json());
db();

app.use("/api/auth",authRoute);
app.use("/api/data", dataRoutes);
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
