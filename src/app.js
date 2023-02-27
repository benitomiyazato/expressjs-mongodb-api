const cookieParser = require("cookie-parser");
const session = require("express-session");
const express = require("express");

const app = express();

const groceriesRoutes = require("./routes/groceries");
const cartRoutes = require("./routes/cart");
const authRoutes = require("./routes/auth");
const authentication = require("./authentication");

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "hasioudmAIUSGDNOASIDM",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/api", authentication);

app.use("/api/groceries", groceriesRoutes);
app.use("/api/cart", cartRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log(`App listening on port: 3000!`);
});
