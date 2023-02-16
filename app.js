const express = require("express");
const cors = require("cors");
const contactRouter = require("./src/routes/contact.route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/contacts", contactRouter);

module.exports = app;
