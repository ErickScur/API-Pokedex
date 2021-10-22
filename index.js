const express = require('express');
const bodyParser = require('body-parser');
const database = require('./src/database');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

database.connect();

app.listen(8080, ()=>{
    console.log("Server is running!");
})

