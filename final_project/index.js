const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();
const PORT = 5000;

// BODY PARSING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SESSION (ONLY ONCE, BEFORE AUTH)
app.use(session({
  secret: "fingerprint_customer",
  resave: false,
  saveUninitialized: true
}));

// AUTH MIDDLEWARE (CORRECT CHECK)
app.use("/customer/auth/*", function auth(req, res, next) {
  if (req.session.authorization && req.session.authorization.accessToken) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized access" });
  }
});

// ROUTES
app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));
