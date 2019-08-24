require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const passport = require('passport');
const path = require('path');

// Controllers
const Products = require("./Controllers/Products.js");
const Categories = require("./Controllers/Categories.js");
const Clients = require("./Controllers/Clients.js");
const Orders = require("./Controllers/Orders.js");
const Attributes = require("./Controllers/Attributes.js");
const Reviews = require("./Controllers/Reviews.js");

//Config
const Strategy = require("./config/Passport.js");
passport.use(Strategy);

// Middlewares
const app = new express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan("dev"));
app.use(cors());

app.use('/api/*', passport.authenticate('jwt', {
  session: false
}));

//ROUTES

app.get("/api/attributes", Attributes.index);
app.get("/api/attributes/:id", Attributes.find);

app.get("/api/categories", Categories.index);
app.get("/api/categories/:id", Categories.show);

app.get("/api/orders", Orders.index);

app.get("/api/products", Products.index);
app.get("/api/products/:id", Products.show);
app.get("/api/products/category/:id", Products.productsByCategory);
app.get("/api/products/total", Products.totalProductsInCategory);
app.get("/api/productcategories", Products.getProductCategories);

app.get("/api/reviews", Reviews.index);
app.get("/api/reviews/:id", Reviews.show);
app.get("/api/reviews/customer/:id", Reviews.showByCustomerId);
app.get("/api/reviews/product/:id", Reviews.showByProductId);
app.post("/api/reviews", Reviews.create);

app.post('/register', Clients.register)
app.post('/login', Clients.login);

app.listen(process.env.PORT || 8083);