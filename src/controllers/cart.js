const getCart = (req, res) => {
  if (req.session.cart) {
    return res.send(req.session.cart);
  }
  res.send("You have no items in your cart");
};

const addItem = (req, res) => {
  const { name, quantity } = req.body;
  const itemToAdd = { name, quantity };

  if (req.session.cart) {
    req.session.cart.items.push(itemToAdd);
    res.json(`Item add: ${itemToAdd}`);
  } else {
    req.session.cart = { items: [itemToAdd] };
    res.json(`New cart created with item: ${{itemToAdd}}`);
  }
};

module.exports = { getCart, addItem };
