const mongoose = require('mongoose');
const uri = "mongodb+srv://erick:91045050@cluster0.zkbev.mongodb.net/BD_Pokedex?retryWrites=true&w=majority";

function connect(){
    try{
        mongoose.connect(
            uri,
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => console.log("connected!")
        );
    }catch (error){
        console.log(error);
    }
}

module.exports = {connect};