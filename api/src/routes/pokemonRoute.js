//  Ultimate

const { Router } = require('express');
const { getAllInfoPokemon, addPokemon, getPokemonByName, getPokemonByID } = require("../controllers/pokemonController.js");
const router = Router();


router.get("/", async (req, res) => {
    try
    {
        const { name } = req.query;
        const allPokemons = await getAllInfoPokemon();

        if(name)
        {
            //  const infoByName = await getPokemonByName(name);
            const infoByName = allPokemons?.find(p => p.name.toLowerCase() === name.toLowerCase());
            res.status(200).json(infoByName);
        }
        else
        {
            //  const allPokemons = await getAllInfoPokemon();
            res.status(200).json(allPokemons);
        }
    }
    catch(err)
    {
        res.status(500).json({ error : err.message });
    }
});


//      Lista Pokemon por ID
router.get("/:idPokemon", async (req, res) => {
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
router.post("/", async(req, res) => {
    try
    {
        const { name, life, attack, defense, speed, height, weight, image, type } = req.body;
        const envio = await addPokemon(name, life, attack, defense, speed, height, weight, image, type);
        envio.success ? res.status(201).json(envio) : res.status(400).json(envio) ;
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({ error : err.message });
    }
});


router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await Pokemon.destroy({
        where: {
            id: id,
        },
        });
        return res.status(200).send("Delete Succesfull");
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});




module.exports = router;
