const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
    pokedex_index:{
        type:Number,
        required: true
    },
    name:{
        type:String,
        required:true
    },
    hp:{
        type:Number,
        required: true
    },
    attack:{
        type:Number,
        required:true
    },
    defense:{
        type:Number,
        required:true
    },
    special_attack:{
        type:Number,
        required:true
    },
    special_defense:{
        type:Number,
        required:true
    },
    speed:{
        type:Number,
        required: true
    },
    generation:{
        type:Number,
        required:true
    },
    Types:{
        type:Array,
        required:true
    },
    image:{
        data: Buffer,
        contentType: String
    }
});
mongoose.model('Pokemon', PokemonSchema);