const fetch = require("node-fetch");
const { Pokemon, Type } = require("../db");
const { URL_API_POKEMON, URL_API_POKEMON_NAME_OR_ID } = require("../utils/global");


//              Ultimate

//      Aqui traigo todos los pokemon de la API a traves de la URL y SubURL
const getPokemonAPI = async () => {
    let objetoPokemon = {
        pokemon: null,
        next: ""
    }

    const totalPokemonAPI = await fetch(URL_API_POKEMON).then(res => res.json()).then(data => {
    //  const totalPokemonAPI = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=126").then(res => res.json()).then(data => { 
        //  console.log(data);
        return {
            url: data.results.map(pokeUrl => pokeUrl.url),
            next: data.next
        }
    }).then(async data => {
        await Promise.all(
            data.url.map(obj => fetch(obj).then(res => res.json()).catch(error => { throw new Error(error.message) }))
        ).then(
            data => { 
                objetoPokemon.pokemon = data.map(obj => {
                    return {
                        id: obj.id,
                        name: obj.name,
                        life: obj.stats[0].base_stat,
                        attack: obj.stats[1].base_stat,
                        defense: obj.stats[2].base_stat,
                        speed: obj.stats[5].base_stat,
                        height: obj.height,
                        weight: obj.weight,
                        image: obj.sprites.other.dream_world.front_default,
                        types: obj.types.map(el => el.type.name)
                    }
                })
            }
        );
    });
    return objetoPokemon.pokemon;
}


//  Ahora traer la inforacion de la Base de Datos Pokemon
const getPokemonDB = async () => {    
    try
    {
        const infoPokemonAll = await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ["name"],
            }
        });

        const pokemonsList = await infoPokemonAll.map(x => {
            return {
              ...x.dataValues,
              types: x.types.map(x => x.name)
            }
        })

        return pokemonsList;
    }
    catch(error)
    {
        throw new Error(error.message);
    }
}


//      Ahora uno la informacion de la API de Pokemon y de la Base de Datos
const getAllInfoPokemon = async () => {
    try
    {
        let pokemonApi = await getPokemonAPI();
        let pokemonDB = await getPokemonDB();        
        let infoTotal = await pokemonApi.concat(pokemonDB);
        return infoTotal;
    }
    catch(error)
    {
        /*
        console.log(error);
        return error;
        */
        throw new Error(error.message);
    }
}


//      Consigo la informacion de un solo Pokemon
const getOnePokemon = async (url) => {
    let retorno = null;
    await fetch(url)
        .then((res) => res.json())
        .then((data) => {
            retorno = {
            id: data.id,
            name: data.name,
            life: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight,
            image: data.sprites.other.dream_world.front_default,
            types: data.types.map((y) => y.type.name),
            };
      })
      .catch((err) => {
        throw new Error(err.message);
      });
    return retorno;
};


//      Consigo la informacion de un solo Pokemon filtrando por ID
const getPokemonByID = async (id) => {
    try
    {
        if( /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(id))
        {
            const pokemonByID = await Pokemon.findOne({
                where: { id },
                include: { model: Type }
            });

            if(pokemonByID)
            {
                return {
                    ...pokemonByID.dataValues,
                    types: pokemonByID.types.map(x => x.name)
                }
            }
            else
            {
                throw new Error('ROMPO TODO');
            }
        }
        else
        {
            const pokemonInApi = await getOnePokemon(`${ URL_API_POKEMON_NAME_OR_ID }/${ id }`);
            return pokemonInApi;
        }
    }
    catch(error)
    {
        throw new Error(`No se encontro un pokemon con el id ${id}`);
    }
}


//      Consigo la informacion de un solo Pokemon filtrando por nombre
/*
const getPokemonByName = async (name) => {
    try
    {
        const pokemonNameDB = await Pokemon.findOne({
            where: { name },
            include: { model: Type }
        });

        if(pokemonNameDB)
        {
            return {
                ...pokemonNameDB.dataValues,
                types: pokemonNameDB.types.map(x => x.name)
            }
        }
        else
        {
            const pokemonInApi = await getOnePokemon(`${ URL_API_POKEMON_NAME_OR_ID }${ name }`);
            return pokemonInApi;
        }

        return pokemonNameDB;

    }
    catch(error)
    {
        throw new Error(error.message);
    }
}
*/


const addPokemon = async (name, life, attack, defense, speed, height, weight, image, type) => {
    try
    {
        if(name)
        {
            const pokemon = await Pokemon.create({ name, life, attack, defense, speed, height, weight, image });

            //      type
            let types = await Type.findAll({ where: { name: type } });
            if(!types.length)
            {
                //      Esto tiene que cambiarse
                await Type.create({ name: type[0] });
                types = await Type.findAll({ where: { name: type } });
            }

            const uno = await pokemon.addType(types);
            return {
                success: "Pokemon creado satisfactoriamente"
            }
        }
        else
        {
            return {
                error: "Agregar nombre de Pokemon"
            }
        }
    }
    catch(error)
    {
        if(error.name === "SequelizeUniqueConstraintError")
        {
            return { error: "Nombre de Pokemon ya existente" }
        }
        else
        {
            throw new Error(error);
        }
    }
}


//  module.exports = { getPokemonAPI, getPokemonDB, getAllInfoPokemon, getPokemonByID, getPokemonByName, addPokemon }
module.exports = { getPokemonAPI, getPokemonDB, getAllInfoPokemon, getPokemonByID, addPokemon }

