const express = require("express");
const app = express();
const PORT = 3000;

let groceries = [];

app.use(express.json());

app.get("/groceries", (req, res) => {
  res.send(
    groceries.length > 0 ? groceries : "There are no groceries available"
  );
});

app.post("/groceries", (req, res) => {
  const postedGrocery = req.body;
  console.log(`Posted Grocery: ${postedGrocery}`);
  groceries.push(postedGrocery);
  res.json({ mssg: "Grocery Posted!", groceries: groceries });
});

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}!`);
});
