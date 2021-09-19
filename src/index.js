require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");
const app = express();
app.use(express.json());

app.use(authRoutes);
app.use(trackRoutes);
const mongooseUri = "mongodb+srv://admin:passwordandpassword@cluster0.7i0cs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongooseUri);

mongoose.connection.on("connected", () => {
  console.log("DB connection successful");
});

mongoose.connection.on("error", (error) => {
  console.error("OOPS SOMETHING WENT WRONG", error);
});

app.get("/", requireAuth, (req, res) => {
  res.send("HELLO THERE.!!!!");
});

app.listen(3000, () => {
  console.log("hello g, ma chal raha hoon");
});
