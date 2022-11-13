const express = require('express');
const cors = require('cors')
const fetch = require('cross-fetch')
const app = express();
const mongoose = require("mongoose")
let bodyParser = require('body-parser');

const User = require("./Models/user")
const system_time = require("./Models/SystemTime")
const getvehicles = require("./Models/Vehicles");
const Vehicles = require('./Models/Vehicles');
const Routes = require('./Models/Routes')
const Directions = require('./Models/Directions.js')
const Stops = require('./Models/Stops')
const Patterns = require('./Models/Patterns')

// Express Route
const createError = require('http-errors');
const directionRoute = require('../backend/routes/directions.route')
const patternsRoute = require('../backend/routes/patterns.route')
const stopsRoute = require('../backend/routes/stops.route')
const system_timeRoute = require('../backend/routes/system_time.route')
const vehiclesRoute = require('../backend/routes/vehicles.route')

require("dotenv/config");

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/bustime-response",(req,res) => {
  console.log("Connected to the database");
})

app.get("/",(req,res)=>{
  res.send("First Request!!")
});

/*
app.get(process.env.DB_CONNECTION_STRING,(req,res)=>{
  console.log(res);
});

app.post("/create_user", async (req,res)=>{
  try {
    const myuser = new User(req.body);
    await myuser.save();
    res.send(myuser);
  }
  catch (err) {
    res.send({ message : err })
  }
});

app.get("/users",(req,res)=>{
  let users = ['Umais','Ali','Ahmed'];
  res.send({
    users: users,
  })
});


// Get System Time
(async () => {
  try {
    const res = await fetch('https://www.ctabustracker.com/bustime/api/v2/gettime?key=ujAhaYu9dy6TAF2VgMLWK5nnV&format=json');

    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }

    const user = await res.json();

    //console.log(user);
  } catch (err) {
    console.error(err);
  }
})();
*/

// Get System Time and put it into its model
(async () => {
  try {
    const res = await fetch('https://www.ctabustracker.com/bustime/api/v2/gettime?key=ujAhaYu9dy6TAF2VgMLWK5nnV&format=json');

    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }

    let user = await res.json();
    var x = Object.values(user)
    x=x[0]
    await system_time.create({
      tm:x['tm']
    });   
  
  } catch (err) {
    console.error(err);
  }
})();

// Get Vehicles and put it into its model
(async () => {
  try {
    const res = await fetch('https://ctabustracker.com/bustime/api/v2/getvehicles?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=20&format=json');

    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }

    const user = await res.json();
    let vehicles = user['bustime-response'].vehicle
    for (let i = 0; i < vehicles.length; i++) {
        
      Vehicles.create(vehicles[i], (error, data) => {
         if (error) {
           return next(error)
         } else {
           
         }
       })
    }
  } catch (err) {
    console.error(err);
  }
})();

// Get Routes and put it into its model
(async () => {
  try {
    const res = await fetch('http://ctabustracker.com/bustime/api/v2/getroutes?key=ujAhaYu9dy6TAF2VgMLWK5nnV&format=json');

    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }

    const user = await res.json();
    var x = Object.values(user)
    let route = x[0]['routes']
    for (let i = 0; i < route.length; i++) {
        
      Routes.create(route[i], (error, data) => {
         if (error) {
           return next(error)
         } else {
           
         }
       })
    }

    //console.log(user);
  } catch (err) {
    console.error(err);
  }
})();

// Get Directions and put it into its model
(async () => {
  try {
    const res = await fetch('http://ctabustracker.com/bustime/api/v2/getdirections?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=20&format=json');

    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }

    const user = await res.json();
    var x = Object.values(user)
    let direction = x[0]['directions']
    for (let i = 0; i < direction.length; i++) {
        
      Directions.create(direction[i], (error, data) => {
         if (error) {
           return next(error)
         } else {
           
         }
       })
    }

    //console.log(user);
  } catch (err) {
    console.error(err);
  }
})();

// Get Stops and put it into its model
(async () => {
  try {
    const res = await fetch('https://ctabustracker.com/bustime/api/v2/getstops?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=7&dir=Eastbound&format=json');

    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }

    const user = await res.json();
    let stops = user['bustime-response'].stops
    for (let i = 0; i < stops.length; i++) {
        
      Stops.create(stops[i], (error, data) => {
         if (error) {
           return next(error)
         } else {
           
         }
       })
    }
  } catch (err) {
    console.error(err);
  }
})();

// Get Patterns and put it into its model
/*
(async () => {
  try {
    const res = await fetch('https://ctabustracker.com/bustime/api/v2/getpatterns?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=20&pid=954&format=json');

    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }

    const user = await res.json();
    let stops = user['bustime-response'].stops
    for (let i = 0; i < stops.length; i++) {
        
      Stops.create(stops[i], (error, data) => {
         if (error) {
           return next(error)
         } else {
           
         }
       })
    }
  } catch (err) {
    console.error(err);
  }
})();
*/

//Routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/directions', directionRoute)
app.use('/patterns', patternsRoute)
app.use('/stops', stopsRoute)
app.use('/system_time', system_timeRoute)
app.use('/vehicles', vehiclesRoute)

app.listen(3000, () => {
  console.log("Listening to 3000")
})

