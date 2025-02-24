//Budget API 

const express = require('express')
const cors = require('cors')
const budget = require("./budget-data.json");
const app = express();
const port = 3001;

app.use(cors());

app.get("/hello", (req,res)=>{
    res.send("Hello World.");
})

app.get("/budget", (req,res)=>{
    res.json(budget);
})

app.listen(port, ()=>{
    console.log("Api Served at http://localhost:"+port);
})