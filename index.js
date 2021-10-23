const express = require('express');
const bodyParser = require('body-parser');
const database = require('./src/database');
const Pokemon = require('./src/models/Pokemon');
const app = express();
const routes = require('./src/routes');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(routes);

database.connect();

app.listen(8080, ()=>{
    console.log("Server is running!");
})

