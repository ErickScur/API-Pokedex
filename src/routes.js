const express = require('express');
const router = express.Router();
const upload = require('./utils/imageUpload');

const PokemonController = require('./controllers/PokemonController');

router.post('/pokemon',upload.single('image'), PokemonController.store);
router.get('/pokemons', PokemonController.findAll);
router.get('/pokemon/:id', PokemonController.findById);
router.get('/pokemon/index/:pokedex_index', PokemonController.findByPokedexIndex);
router.get('/pokemons/type/:type', PokemonController.findByType);
module.exports= router;