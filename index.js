const express = require("express");
const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = express();

// CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// JSON Server defaults
const middlewares = jsonServer.defaults();
server.use(middlewares);

// Auth rules
const rules = auth.rewriter({
  products: 444,
  featured_products: 444,
  orders: 660,
  users: 600
});

server.use(rules);
server.use(auth);

// Router
const router = jsonServer.router("./data/db.json");
server.db = router.db;
server.use("/api", router);

// Render port
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
