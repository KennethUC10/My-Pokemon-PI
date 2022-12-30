//  Ultimate

const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

/*
const { getAllInfoPokemon, addPokemon, getPokemonByName, getPokemonByID } = require("../controllers/pokemonController.js");
const { getTypeAPI } = require("../controllers/typeController.js");
*/

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


//          Rutas verdaderas

const router = Router();

const pokemonRoute = require("./pokemonRoute.js");
const typeRoute = require("./typeRoute.js");

router.use("/pokemon", pokemonRoute)
router.use("/type", typeRoute);

module.exports = router;



//      Primero
/*
router.get("/pokemon", async (req, res) => {
    try
    {
        const { name } = req.query;
        if(name)
        {
            const infoName = await getPokemonByName(name);
            res.status(200).json(infoName);
        }
        else
        {
            const ayuda = await getAllInfoPokemon();
            res.status(200).json(ayuda);
        }
    }
    catch(err)
    {
        res.status(500).json({ error : err.message });
    }
});


//      Lista Pokemon por ID
router.get("/pokemon/:idPokemon", async (req, res) => {
    try
    {
        const { idPokemon } = req.params;
        const pokemonByID = await getPokemonByID(idPokemon);
        //  console.log(pokemonByID);
        res.status(200).json({ success: pokemonByID });
    }
    catch(err)
    {
        res.status(500).json({ error : err.message });
    }
});


//      Agregar pokemon
router.post("/pokemons", async(req, res) => {
    try
    {
        const { name, life, attack, defense, speed, height, weight, image, type } = req.body;
        const envio = await addPokemon(name, life, attack, defense, speed, height, weight, image, type);
        envio.success ? res.status(201).json(envio) : res.status(400).json(envio) ;
    }
    catch(err)
    {
        res.status(500).json({ error : err.message });
    }
});


//      Listar types
router.get("/types", async (req, res) => {
    try
    {
        const infoName = await getTypeAPI();
        //  console.log(infoName);
        res.status(200).json(infoName);
    }
    catch(err)
    {
        res.status(500).json({ error : err.message });
    }
});
*/


//      =================================================================






/*
router.get("/tester", async (req, res) => {
    try
    {
        const ayuda = await getPokemonAPI();
        res.status(200).json(ayuda);
    }
    catch(error)
    {
        console.log(error);
    }
});


router.get("/db", async (req, res) => {
    try
    {
        const ayuda = await getPokemonDB();
        res.status(200).json(ayuda);
    }
    catch(error)
    {
        console.log(error);
    }
});
*/

