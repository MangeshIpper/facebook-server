const express = require("express");
const mongoose = require("mongoose");
const dotennv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require('config');
const routes = require("./routes");

const app = express();

dotennv.config();

mongoose.connect(config.mongodb.url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
    console.log("connected to mongoDB");
});

// Middlware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/", routes);

app.listen(8000, () => {
  console.log("Backend server is running!");
});
