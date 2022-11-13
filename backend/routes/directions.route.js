let mongoose = require("mongoose"),
express = require("express"),
router = express.Router();

let directions_schema = require("../Models/Directions");

// Create
router.route("/create-directions").post((req, res, next) => {
    directions_schema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// Read
router.route("/read-directions").get((req, res) => {
    directions_schema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update
router.route("/update-directions/:id").put((req, res, next) => {
    directions_schema.findByIdAndUpdate(
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
        console.log("System time updated successfully!");
      }
    }
  );
});

// Delete
router.route("/delete-directions/:id").delete((req, res, next) => {
    directions_schema.findByIdAndRemove(req.params.id, (error, data) => {
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
