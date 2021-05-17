const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
const logger = require("morgan");



const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/budget";



///////////////////////
const app = express();
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger("dev"));
app.use(express.static("public"));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,  useFindAndModify: false,  useUnifiedTopology: true});
//api.js
app.use(require("./routes/api.js"));
app.listen(PORT, () => {console.log(`App running on http://localhost:${PORT}`);});