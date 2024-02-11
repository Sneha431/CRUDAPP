const express = require("express");
const dotenv = require("dotenv");
//The dotenv package is a great way to keep passwords, API keys, and other sensitive data out of your code.
//It allows you to create environment variables in a . env file instead of putting them in your code.
const morgan = require("morgan");
//Morgan is another HTTP request logger middleware for Node. js.
//It simplifies the process of logging requests to your application.
const bodyparser = require("body-parser");
//Body-parser is the Node.js body-parsing middleware. It is responsible for parsing the incoming request bodies in a middleware
const app = express();
const path = require("path");
const connectDB = require("./server/database/connection");

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT;

// mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));
//set view engine
app.set("view engine", "ejs");
//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.use("/images", express.static(path.resolve(__dirname, "assets/images")));

app.use("/", require("./server/routes/router"));
//log request
app.use(morgan("tiny"));

app.listen(3000, () => {
  console.log(`Server is running port:${PORT}`);
});
