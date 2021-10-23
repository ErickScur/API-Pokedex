const mongoose = require('mongoose');
const Pokemon = mongoose.model('Pokemon');
const capitalize = require('../utils/capitalize');
const validateStats = require('../utils/validateStats');
const fs = require('fs');
const path = require('path');

module.exports = {
    async store(req,res){
        let { pokedex_index, name, hp, attack, defense, special_attack, special_defense, speed, generation, Types} = req.body;
        if(pokedex_index && name && hp && attack && defense && special_attack && special_defense && speed && generation && Types){
            req.body.name = capitalize(name); 
            if(typeof(Types) == 'string'){ //Quando for somente um tipo, HTML envia como String, quando for mais que um tipo envia como Array
                req.body.Types = capitalize(Types);
            }else{
                req.body.Types = Types.map(element => capitalize(element));
            }
            
            let findPokemonByName = await Pokemon.find({name:name}); //Nome é um atributo único, então verifica se existe um pokemon com esse nome
            if(findPokemonByName.length > 0)
                return res.status(409).json({err:"Name already in use!"});

            let findPokemonByIndex = await Pokemon.find({pokedex_index:pokedex_index}); //Pokedex index é um atributo único, então verifica se existe um pokemon com esse index
            if(findPokemonByIndex.length > 0)
                return res.status(409).json({err:"Pokedex Index already in use!"});  

            let validate = validateStats(hp, attack, defense, special_attack, special_defense, speed, generation);//Valida os limites dos status do Pokemon
            if(!validate.isValid)
                return res.status(400).json({err:"These fields have values that are out of range: "+validate.errors});

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
        if(id){
            const pokemon = await Pokemon.findById(id);
            if(pokemon){
                return res.status(200).json(pokemon);
            }else{
                return res.status(404).json({err:"Pokemon not found!"});
            }
        }else{
            return res.status(422).json({err:"One or more parameters are missing!"});
        }
    },
    async findByPokedexIndex(req,res){
        const pokedex_index = req.params.pokedex_index;
        if(pokedex_index){
            const pokemon = await Pokemon.findOne({'pokedex_index':pokedex_index});
            if(pokemon){
                return res.json(pokemon);
            }else{
                return res.status(404).json({err:"Pokemon not found!"});
            }
        }else{
            return res.status(422).json({err:"One or more parameters are missing!"});
        }
    },
    async findByType(req,res){
        const type = capitalize(req.params.type);
        if(type){
            const pokemons = await Pokemon.find({ 'Types': type});
            if(pokemons.length > 0){
                return res.json(pokemons);
            }else{
                return res.status(404).json({err:"no Pokemons were found!"});
            }
        }else{
            return res.status(422).json({err:"One or more parameters are missing!"});
        }
    },
    async update(req,res){
        const id = req.params.id;
        let { pokedex_index, name, hp, attack, defense, special_attack, special_defense, speed, generation, Types} = req.body;
        if(pokedex_index && name && hp && attack && defense && special_attack && special_defense && speed && generation && Types){
            req.body.name = capitalize(name); 
            if(typeof(Types) == 'string'){ //Quando for somente um tipo, HTML envia como String, quando for mais que um tipo envia como Array
                req.body.Types = capitalize(Types);
            }else{
                req.body.Types = Types.map(element => capitalize(element));
            }

            let oldPokemon = await Pokemon.findById(id);
            if(oldPokemon){
                if(!(oldPokemon.name == name)){
                    let findPokemonByName = await Pokemon.find({name:name}); //Nome é um atributo único, então verifica se existe um pokemon com esse nome
                    if(findPokemonByName.length > 0)
                        return res.status(409).json({err:"Name already in use!"});
                }

                if(!(oldPokemon.pokedex_index == pokedex_index)){
                    let findPokemonByIndex = await Pokemon.find({pokedex_index:pokedex_index}); //Pokedex index é um atributo único, então verifica se existe um pokemon com esse index
                    if(findPokemonByIndex.length > 0)
                        return res.status(409).json({err:"Pokedex Index already in use!"});  
                }

                let validate = validateStats(hp, attack, defense, special_attack, special_defense, speed, generation);//Valida os limites dos status do Pokemon
                if(!validate.isValid)
                    return res.status(400).json({err:"These fields have values that are out of range: "+validate.errors});

                if(req.file){ //Caso exista imagem na requisição
                    let contentType = 'image/'+ path.extname(req.file.originalname).replace(/\./g,"");
                    let image = {
                        data: fs.readFileSync(path.join(__dirname + '/../uploads/' + name + path.extname(req.file.originalname))),
                        contentType: contentType
                    }
                    let obj = Object.assign(req.body, {image});
                    var pokemon = await Pokemon.findByIdAndUpdate(id,obj, {new:true});
                }else{ //Caso não exista imagem
                    var pokemon = await Pokemon.findByIdAndUpdate(id,req.body, {new:true});
                }
                return res.status(200).json(pokemon);
            }else{
                return res.status(404).json({err:"no Pokemons were found!"});
            }
        }else{
            return res.status(422).json({err:"One or more parameters are missing!"});
        }
    }
}