var express = require("express");
var router = express.Router();
var cat = require("../models/burger.js");
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burger: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});
router.post("/api/burger", function(req, res) {
  burger.create([
    "name",
  ], [
    req.body.name, 
  ], function(result) {
    res.json({ id: result.insertId });
  });
});
router.put("/api/burger/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition", condition);
  burger.update({
    name: req.body.name
  }, condition, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
router.delete("/api/burger/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
module.exports = router;