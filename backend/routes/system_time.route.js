let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

let system_time_schema = require("../Models/SystemTime");

// Create
router.route("/create-system-time").post((req, res, next) => {
  system_time_schema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// Read
router.route("/read-system-time").get((req, res) => {
  system_time_schema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update
router.route("/update-system-id/:id").put((req, res, next) => {
    system_time_schema.findByIdAndUpdate(
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
router.route("/delete-system-time/:id").delete((req, res, next) => {
    system_time_schema.findByIdAndRemove(req.params.id, (error, data) => {
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
