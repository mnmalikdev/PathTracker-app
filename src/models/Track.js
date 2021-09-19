const mongoose = require("mongoose");
//points present on a track schema

const pointSchema = new mongoose.Schema({
  //WARNING: DONT MAKE ANY CHANGES TO THIS POINT SCHEMA. THIS IS THE EXECT OBJECT RECIEVED FROM A MOBILE PHONE.
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
});

const trackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // note: ref points to modelname of User.js Model file.
  },
  name: {
    type: String,
    default: "untitled-track",
  },
  Locations: [pointSchema], // this will consist of an array with different points on a track. NOTE THAT SEVERAL POINTS WOULD COMBINE TO MAKE ONE TRACK. so they are sub-units of a bigger unit.
});
mongoose.model("Track", trackSchema);
