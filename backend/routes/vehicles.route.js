let mongoose = require("mongoose"),
express = require("express"),
router = express.Router();

let vehicles_schema = require("../Models/Vehicles");

// Create
router.route("/create-vehicles").post((req, res, next) => {
    vehicles_schema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// Read
router.route("/read-vehicles").get((req, res) => {
    vehicles_schema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update
router.route("/update-vehicles/:id").put((req, res, next) => {
    vehicles_schema.findByIdAndUpdate(
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
router.route("/delete-vehicles/:id").delete((req, res, next) => {
    vehicles_schema.findByIdAndRemove(req.params.id, (error, data) => {
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
