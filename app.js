const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
// const mongoose = require('mongoose');
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// const MONGODB_URI =  'mongodb+srv://shop:4W6RVfGLECaQkDjL@cluster0-5zjmf.mongodb.net/test?retryWrites=true&w=majority';
app.use(
  express.urlencoded({
    extended: true,
  })
);

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
  const token = req.params.token;
  const data = JSON.parse(fs.readFileSync(dir + "/data.json", "utf-8"));
  console.log(data.token);
  if (token === data.token) {
    res.status(200).json({
      create: data,
      params: token,
    });
  } else {
    res.status(404).json({
      message: data,
    });
  }
});

app.post("/data", (req, res, next) => {
  const body = req.body;
  fs.writeFileSync(dir + "/data.json", JSON.stringify(body));
  res.status(201).json(body);
});

app.listen(PORT, () => {
  console.log("Server run!");
});
