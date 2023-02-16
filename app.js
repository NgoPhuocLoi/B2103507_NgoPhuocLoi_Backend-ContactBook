const express = require("express");
const cors = require("cors");
const contactRouter = require("./src/routes/contact.route");
const ApiError = require("./src/helpers/api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/contacts", contactRouter);

app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  const code = err.statusCode || 500;
  const msg = err.message || "Internal Server Error";
  return res.status(code).json({ message: msg });
});

module.exports = app;
