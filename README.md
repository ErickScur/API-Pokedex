# API-Pokedex

API REST para uma Pokedex.

## API Endpoints
### GET /pokemons
Retorna todos os Pokemons do banco de dados.
#### Parâmetros:
Nenhum
#### Respostas:
##### Ok! 200
Sua requisição foi processada com sucesso.
#### Exemplo de Resposta:
    [
        {
            "_id": "61736a4e20d7443a3099d77f",
            "pokedex_index": 1,
            "name": "Bulbasaur",
            "hp": 45,
            "attack": 49,
            "defense": 49,
            "special_attack": 65,
            "special_defense": 65,
            "speed": 45,
            "generation": 1,
            "Types": [
            "Grass",
            "Poison"
            ],
            "__v": 0
        },
        {
            "_id": "61736a6de28cb8aa6214f7ea",
            "pokedex_index": 2,
            "name": "Ivysaur",
            "hp": 60,
            "attack": 62,
            "defense": 63,
            "special_attack": 80,
            "special_defense": 80,
            "speed": 60,
            "generation": 1,
            "Types": [
            "Grass",
            "Poison"
            ],
            "__v": 0
        },
        {
            "_id": "61736a76e28cb8aa6214f7ec",
            "pokedex_index": 3,
            "name": "Venusaur",
            "hp": 80,
            "attack": 82,
            "defense": 83,
            "special_attack": 100,
            "special_defense": 100,
            "speed": 80,
            "generation": 1,
            "Types": [
            "Grass",
            "Poison"
            ],
            "__v": 0
        }
    ]

### GET /pokemon/:id
Retorna o Pokemon que possui o Id solicitado.
#### Parâmetros:
* Id: O Id do pokemon.
#### Respostas:
##### Ok! 200
Sua requisição foi processada com sucesso.
##### Unprocessable Entity! 422
Um ou mais parametros não foram enviados. 
##### Not Found! 404
A API não encontrou um Pokemon com o Id solicitado.
#### Exemplo de Resposta:
    {
    "_id": "6174085be632d2184d105c09",
    "pokedex_index": 13,
    "name": "Weedle",
    "hp": 40,
    "attack": 35,
    "defense": 30,
    "special_attack": 20,
    "special_defense": 20,
    "speed": 50,
    "generation": 1,
    "Types": [
        "Bug",
        "Poison"
    ],
    "__v": 0
    }

### GET /pokemon/index/:pokedex_index
Retorna o Pokemon que possui o index da Pokedex solicitado.
#### Parâmetros:
* pokedex_index: index da Pokedex do Pokemon.
#### Respostas:
##### Ok! 200
Sua requisição foi processada com sucesso.
##### Unprocessable Entity! 422
Um ou mais parametros não foram enviados. 
##### Not Found! 404
A API não encontrou um Pokemon com o index da Pokedex solicitado.
#### Exemplo de Resposta:
    {
    "_id": "61736a91e28cb8aa6214f7f2",
    "pokedex_index": 6,
    "name": "Charizard",
    "hp": 78,
    "attack": 84,
    "defense": 78,
    "special_attack": 109,
    "special_defense": 85,
    "speed": 100,
    "generation": 1,
    "Types": [
        "Fire",
        "Flying"
    ],
    "__v": 0
    }


### GET /pokemons/type/:type
Retorna todos os Pokemons que são do tipo solicitado.
### Parâmetros:
* type: O tipo do Pokemon.
### Respostas:
##### Ok! 200
Sua requisição foi processada com sucesso.
##### Unprocessable Entity! 422
Um ou mais parametros não foram enviados. 
##### Not Found! 404
A API não encontrou Pokemons que possuam o tipo solicitado.
#### Exemplo de Resposta:
    [
        {
            "_id": "61736a81e28cb8aa6214f7ee",
            "pokedex_index": 4,
            "name": "Charmander",
            "hp": 39,
            "attack": 52,
            "defense": 43,
            "special_attack": 60,
            "special_defense": 50,
            "speed": 65,
            "generation": 1,
            "Types": [
            "Fire"
            ],
            "__v": 0
        },
        {
            "_id": "61736a8ae28cb8aa6214f7f0",
            "pokedex_index": 5,
            "name": "Charmeleon",
            "hp": 58,
            "attack": 64,
            "defense": 58,
            "special_attack": 80,
            "special_defense": 65,
            "speed": 80,
            "generation": 1,
            "Types": [
            "Fire"
            ],
            "__v": 0
        },
        {
            "_id": "61736a91e28cb8aa6214f7f2",
            "pokedex_index": 6,
            "name": "Charizard",
            "hp": 78,
            "attack": 84,
            "defense": 78,
            "special_attack": 109,
            "special_defense": 85,
            "speed": 100,
            "generation": 1,
            "Types": [
            "Fire",
            "Flying"
            ],
            "__v": 0
        }
    ]

### POST /pokemon
Insere um Pokemon no banco de dados.
#### Atributos:
* pokedex_index: Um inteiro único, correspondente ao index do Pokedex do pokemon.
* name: nome ÚNICO do pokemon.
* hp: Vida do pokémon com valor entre 1 e 255 (inclusos).
* attack: Pontos de ataque, valor entre 5 e 190 (inclusos).
* defense: Pontos de defesa, valor entre 5 e 230 (inclusos).
* special_attack: Pontos de ataque especial, valor entre 10 e 194 (inclusos).
* special_defense: Pontos de defesa especial, valor entre 20 e 230 (inclusos).
* speed: Pontos de velocidade, valor entre 5 e 180 (inclusos).
* generation: Geração do pokémon, valor entre 1 e 6 (inclusos).
* Types: Os tipos, podendo haver mais de um tipo para um mesmo pokémon.
* image(opcional): A imagem do Pokemon.
#### Exemplo de Requisição:
    {
        "pokedex_index": 9,
        "name": "Blastoise",
        "hp": 79,
        "attack": 83,
        "defense": 100,
        "special_attack": 85,
        "special_defense": 105,
        "speed": 78,
        "generation": 1,
        "Types": [
            "Water"
        ]
    }
#### Respostas:
##### Ok! 200
Sua requisição foi processada com sucesso.
##### Unprocessable Entity! 422
Um ou mais atributos não foram enviados. 
##### Conflict! 409
O nome do Pokemon ou seu Pokedex Index já estão em uso.
#### Exemplo de Resposta:
    {
        "pokedex_index": 9,
        "name": "Blastoise",
        "hp": 79,
        "attack": 83,
        "defense": 100,
        "special_attack": 85,
        "special_defense": 105,
        "speed": 78,
        "generation": 1,
        "Types": [
            "Water"
        ],
        "_id": "6174010f0f91b1892015b554",
        "__v": 0
    }

### PUT /pokemon/:id
Atualiza os dados de um Pokemon no banco de dados.
#### Parâmetros:
* Id: O Id do Pokemon.
#### Atributos:
* pokedex_index: Um inteiro único, correspondente ao index do Pokedex do pokemon.
* name: nome ÚNICO do pokemon.
* hp: Vida do pokémon com valor entre 1 e 255 (inclusos).
* attack: Pontos de ataque, valor entre 5 e 190 (inclusos).
* defense: Pontos de defesa, valor entre 5 e 230 (inclusos).
* special_attack: Pontos de ataque especial, valor entre 10 e 194 (inclusos).
* special_defense: Pontos de defesa especial, valor entre 20 e 230 (inclusos).
* speed: Pontos de velocidade, valor entre 5 e 180 (inclusos).
* generation: Geração do pokémon, valor entre 1 e 6 (inclusos).
* Types: Os tipos, podendo haver mais de um tipo para um mesmo pokémon.
* image(opcional): A imagem do Pokemon.
#### Exemplo de Requisição:
    {
        "pokedex_index": 13,
        "name": "weedle",
        "hp": 40,
        "attack": 35,
        "defense": 30,
        "special_attack": 20,
        "special_defense": 20,
        "speed": 50,
        "generation": 1,
        "Types": [
            "bug",
                "poison"
        ]
    }
#### Respostas:
##### Ok! 200
Sua requisição foi processada com sucesso.
##### Unprocessable Entity! 422
Um ou mais parametros não foram enviados. 
##### Not Found! 404
A API não encontrou um Pokemon com o Id solicitado.
##### Conflict! 409
O nome do Pokemon ou seu Pokedex Index já estão em uso.
#### Exemplo de Resposta:
    {
        "_id": "6174085be632d2184d105c09",
        "pokedex_index": 13,
        "name": "Weedle",
        "hp": 40,
        "attack": 35,
        "defense": 30,
        "special_attack": 20,
        "special_defense": 20,
        "speed": 50,
        "generation": 1,
        "Types": [
            "Bug",
            "Poison"
        ],
        "__v": 0
    }