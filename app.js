const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
// const mongoose = require('mongoose');
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

app.use(bodyParser.json());

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const dir = __dirname;

app.get("/data/:token", (req, res) => {
  // const token = req.params.token;
  const data = JSON.parse(fs.readFileSync(dir + "/data.json", "utf-8"));
  res.status(200).json(data);
  // if (token === data.token) {

  // } else {
  //   res.status(404).json({
  //     message: 'lol',
  //   });
  // }
});

app.post("/data", (req, res, next) => {
  const body = req.body;
  console.log(body)
  fs.writeFileSync(dir + "/data.json", JSON.stringify(body));
  res.status(201).json("success");
});

app.listen(PORT, () => {
  console.log("Server run!");
});
