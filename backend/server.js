const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
const db = require("./config/db.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/flights", require("./routes/flights"));
app.use("/api/reservations", require("./routes/reservations"));
app.use("/api/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
