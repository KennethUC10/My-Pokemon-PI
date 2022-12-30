
export const filtradoLibreria = ({  origen, tipo, alfabeticamente }, listPokemon ) => {

    let listPokemonCopy = [];

    if(origen === "ALL")
    {
        listPokemonCopy = listPokemon.slice();
    }
    else
    {
        if(origen === "CREATED")
        {
            listPokemonCopy = listPokemon.filter( (e) => e.createInDB );
        }
        else
        {
            listPokemonCopy = listPokemon.filter( (e) => !e.createInDB );
        }
    }


    if(tipo !== "ALL")
    {
        /*
        console.log("comentario 1", listPokemonCopy);
        console.log("Origen", origen, "Tipo", tipo);
        */

        listPokemonCopy = listPokemonCopy.filter( (e) => {
            //console.log("comentario 3", e.types.includes(tipo));
            return e.types.includes(tipo);
        });
    }


    if(alfabeticamente !== "ALL")
    {
        if(alfabeticamente === "A-Z")
        {
            listPokemonCopy.sort( (a,b) => {
                if(b.name.toLowerCase() > a.name.toLowerCase())
                {
                    return -1;
                }

                if(b.name < a.name)
                {
                    return 1;
                }

                return 0;
            })            
        }
        else if(alfabeticamente === "Z-A")
        {
            listPokemonCopy.sort( (a,b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase())
                {
                    return -1;
                }

                if(a.name < b.name)
                {
                    return 1;
                }

                return 0;
            })
        }

        else if(alfabeticamente === "ASC")
        {
            listPokemonCopy.sort((a, b) => b.attack - a.attack);
        }
        else if(alfabeticamente === "DESC")
        {
            listPokemonCopy.sort((a, b) => a.attack - b.attack);
        }

    }

    return listPokemonCopy;
}
