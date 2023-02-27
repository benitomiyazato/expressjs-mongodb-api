let groceries = [];

const findAll = (req, res) => {
  res.send(
    groceries.length > 0 ? groceries : "There are no groceries available"
  );
};

const saveNewGrocery = (req, res) => {
  const postedGrocery = req.body;
  console.log(`Posted Grocery: ${postedGrocery}`);
  groceries.push(postedGrocery);
  res.json({ mssg: "Grocery Posted!", groceries: groceries });
};

module.exports = { findAll, saveNewGrocery };
