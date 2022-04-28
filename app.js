const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoos = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("626a2d43368d148c438bbf59")
    .then((user) => {
      console.log(user, "user");
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoos
  .connect('mongodb+srv://muhammadbobur:1234@cluster0.a8kar.mongodb.net/test')
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
