const mongoose = require('mongoose');
const Pokemon = mongoose.model('Pokemon');
const capitalize = require('../utils/capitalize');
const path = require('path');

module.exports = {
    async store(req,res){
        let { pokedex_index, name, hp, attack, defense, special_attack, special_defense, speed, generation, Types} = req.body;
        if(pokedex_index && name && hp && attack && defense && special_attack && special_defense && speed && generation && Types){
            name = capitalize(name); 
            Types = Types.map(element => capitalize(element));

            let findPokemonByName = await Pokemon.find({name:name}); //Nome é um atributo único, então verifica se existe um pokemon com esse nome
            if(findPokemonByName.length > 0)
                return res.status(403).json({err:"Name already in use!"});

            let findPokemonById = await Pokemon.find({pokedex_index:pokedex_index}); //Pokedex index é um atributo único, então verifica se existe um pokemon com esse index
            if(findPokemonById.length > 0)
                return res.status(403).json({err:"Pokedex Index already in use!"});  

            if(req.file){ //Caso exista imagem na requisição
                let contentType = 'image/'+ path.extname(req.file.originalname).replace(/\./g,"");
                let image = {
                    data: fs.readFileSync(path.join(__dirname + '/../uploads/' + name + path.extname(req.file.originalname))),
                    contentType: contentType
                }
                let obj = Object.assign(req.body, {image});
                var pokemon = await Pokemon.create(obj);
            }else{ //Caso não exista imagem
                var pokemon = await Pokemon.create(req.body);
            }
            return res.status(200).json(pokemon);
        }else{
            return res.status(422).json({err:"One or more parameters are missing!"});
        }
       
    },
    async findAll(req,res){
        const pokemons = await Pokemon.find({});
        return res.status(200).json(pokemons);
    },
    async findById(req,res){
        const id = req.params.id;
        const pokemon = await Pokemon.findById(id);
        return res.status(200).json(pokemon);
    },
    async findByPokedexIndex(req,res){
        const pokedex_index = req.params.pokedex_index;
        const pokemon = await Pokemon.findOne({'pokedex_index':pokedex_index});
        return res.json(pokemon);
    },
    async findByType(req,res){
        const type = capitalize(req.params.type);
        const pokemons = await Pokemon.find({ 'Types': type});
        return res.json(pokemons);
    }
}