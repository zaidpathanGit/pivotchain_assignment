const express = require("express");
const app = express();

// DB CONNECTION
const { connectDB } = require("./DB");

// CONFIGS
const { SERVER_PORT } = require("./configs");

// ROUTES
const { customerRoutes } = require("./Routes/CustomerRoutes");

// CORS
const { CORS } = require("./Utils/CORS");

// MIDDLEWARES
app.use(express.json());
app.use(CORS);

// MAIN ROUTE
app.use("/customer", customerRoutes);

// NOT FOUND
app.use("", function (req, res) {
  res.status(404).send({ error: "Requested resource was not found!" });
});

connectDB(() =>
  app.listen(SERVER_PORT, () => {
    console.log(`Server listening at ${SERVER_PORT}`);
  })
);
