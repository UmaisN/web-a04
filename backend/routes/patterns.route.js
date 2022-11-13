let mongoose = require("mongoose"),
express = require("express"),
router = express.Router();

let patterns_schema = require("../Models/Patterns");

// Create
router.route("/create-patterns").post((req, res, next) => {
    patterns_schema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// Read
router.route("/read-patterns").get((req, res) => {
    patterns_schema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update
router.route("/update-patterns/:id").put((req, res, next) => {
    patterns_schema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
      }
    }
  );
});

// Delete
router.route("/delete-patterns/:id").delete((req, res, next) => {
    patterns_schema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
