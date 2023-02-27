const express = require("express");
const app = express();

const groceriesRoutes = require("./routes/groceries");
const PORT = 3000;

app.use(express.json());

app.use("/api/groceries", groceriesRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}!`);
});
