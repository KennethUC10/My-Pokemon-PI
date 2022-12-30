const fetch = require("node-fetch");
const { Pokemon, Type } = require("../db");
const { URL_API_POKEMON_TYPE } = require("../utils/global");
const { getAllInfoPokemon } = require("./pokemonController");


//              Ultimate

//      Aqui traigo todos los tipos de la API a traves de la URL y SubURL
const getTypeAPI = async () => {

    /*
    try {

        const pokemons = await getAllInfoPokemon();
        const types = pokemons?.map((p) => p.type).flat();
        const listTypes = [];

        for (const type of types) {
            if(!listTypes.includes(type)) {
              listTypes.push(type)
            }    
        }

        for (const type of listTypes) {
            await Type.findOrCreate({where: {name: type}})  
        }

        const allTypes = await Type.findAll();
        //  res.status(200).json(allTypes);

        return allTypes;

      } catch (error) {
        console.log({ error: error.message });
      }
    */




    let tipos = await Type.findAll();
    let objTipos = null;

    if (!tipos.length) {    
        //  console.log("Entre");
        await fetch(URL_API_POKEMON_TYPE).then(res => res.json())
            .then(data => {
                console.log(data);
                objTipos = data.results.map(e => { return { name: e.name } });
            })
            .catch(err => {
                throw new Error(err);
            })
    
        /*
        const res = await fetch(URL_API_POKEMON_TYPE);
        const data = await res.json();
        console.log(data);
        objTipos = data.results.map(e => { return { name: e.name } });
        */

        await Type.bulkCreate(objTipos);
        tipos = await Type.findAll();
    }
    return tipos;


}

module.exports = { getTypeAPI }

