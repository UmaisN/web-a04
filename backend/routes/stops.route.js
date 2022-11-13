let mongoose = require("mongoose"),
express = require("express"),
router = express.Router();

let stops_schema = require("../Models/Stops");

// Create
router.route("/create-stops").post((req, res, next) => {
    stops_schema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// Read
router.route("/read-stops").get((req, res) => {
    stops_schema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update
router.route("/update-stops/:id").put((req, res, next) => {
    stops_schema.findByIdAndUpdate(
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
router.route("/delete-stops/:id").delete((req, res, next) => {
    stops_schema.findByIdAndRemove(req.params.id, (error, data) => {
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
