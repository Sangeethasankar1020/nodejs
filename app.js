// server creation

// const http = require('http') //importing package
// http.createServer(function (req, res) {
//     res.write("server is running") //response
//     res.end()

// }).listen(3000)

// import express
const express = require("express");
const app = express();
const db = require("./src/database/db");
const userRouter = require("./src/router/userrouter"); //import router to use user

const productRouter=require("./src/router/productrouter") //product router import for use
const orderRoute=require("./src/router/orderRouter")
const bodyParser = require("body-parser");
// router use

app.use(bodyParser.json());
app.use("/user", userRouter); //parent api for user registers
// product router to use

app.use("/product",productRouter)  //changing product route as parent for product 

// order
app.use("/order",orderRoute)
// data base
db.on("open", () => {
  app.listen(3000),
    () => {
      console.log("server working");
    };
});

db.on("error", () => {
  console.log("error db");
});
