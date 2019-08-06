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

// Models

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
app.get("/api/products", Products.index);
app.get("/api/products/:id", Products.show);
app.get("/api/products/category/:id", Products.productsByCategory);

app.get("/api/categories", Categories.index);
app.get("/api/categories/:id", Categories.show);
app.get("/api/orders", Orders.index);

app.post('/register', Clients.register)
app.post('/login', Clients.login);

app.listen(process.env.PORT || 8083);