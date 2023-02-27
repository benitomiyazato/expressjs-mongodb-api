const { Router } = require("express");
const router = Router();

const groceryController = require("../controllers/groceries");

router.get("", groceryController.findAll);
router.post("", groceryController.saveNewGrocery);


module.exports = router;
