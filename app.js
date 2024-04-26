const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const errorHandler = require('./middleware/errorHandler');
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

// Set global variable for base directory
global.__basedir = __dirname;

// Set allowed origins for CORS
const allowedOrigins = ["http://localhost:3000"];

// Configure CORS middleware
app.use(
  cors({
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
  })
);

// Parse JSON bodies
app.use(express.json());

// Set up routes
app.use("/", routes);
// Error handler middleware (should be placed after all other middleware and routes)
app.use(errorHandler);

// Start server
if (process.env.NODE_ENV !== 'test') app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
connectDB();
module.exports = app;
