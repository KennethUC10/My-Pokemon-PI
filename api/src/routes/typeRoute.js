const express = require('express');
const router = express.Router();
const controller = require('../controllers/typeController');

router.get("/", async (req, res) =>
{
    try
    {
        const infoType = await controller.getTypeAPI();
        //  const pokemons = await getAllInfoPokemon();
        res.status(200).json(infoType);
    }
    catch(err)
    {
        res.status(400).json({ error: err });
    }

});


module.exports = router;

