const express = require("express");
const router = express.Router();
const db = require("../db");
const bodyParser = require("body-parser");

router.use(bodyParser.json()); // for parsing application/json

/* get method for fetch all products. */
router.get("/", (req, res, next) => {
  const sql = "SELECT * FROM products WHERE active=1";
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: "The API returned an error" });
    }
    res.json(rows);
  });
});

/*get method for fetch single product*/
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const sql = `SELECT * FROM products WHERE id=${id}`;
  db.query(sql, function(err, row, fields) {
    if (err) {
      res.status(500).send({ error: "The API returned an error" });
    }
    if (row[0] === undefined) {
      res.status(404).send({ error: "Element not found." });
    } else {
      res.json(row[0]);
    }
  });
});

/*post method for create product*/
router.post("/create", (req, res, next) => {
  const name = req.body.name;
  const sku = req.body.sku;
  const price = req.body.price;

  const sql = `INSERT INTO products (name, sku, price, active, created_at) VALUES ("${name}", "${sku}", "${price}", 1, NOW())`;
  db.query(sql, function(err, result) {
    if (err) {
      res.status(500).send({ error: "The API returned an error" });
    }
    res.json({ status: true, id: result.insertId });
  });
});

/*put method for update product*/
router.put("/update/:id", function(req, res, next) {
  const id = req.params.id;
  const name = req.body.name;
  const sku = req.body.sku;
  const price = req.body.price;

  const sql = `UPDATE products SET name="${name}", sku="${sku}", price="${price}" WHERE id=${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send({ error: "The API returned an error" });
    }
    if (result.affectedRows === 0) {
      res.status(404).send({ error: "Element not found." });
    } else {
      res.json({ status: true, id: id });
    }
  });
});

/*delete method for delete product*/
router.delete("/delete/:id", function(req, res, next) {
  const id = req.params.id;
  const sql = `DELETE FROM products WHERE id=${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send({ error: "The API returned an error" });
    }
    if (result.affectedRows === 0) {
      res.status(404).send({ error: "Element not found." });
    } else {
      res.json({ status: true });
    }
  });
});

module.exports = router;
