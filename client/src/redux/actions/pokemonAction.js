import { LIST_POKEMON } from "../../utils/global.js"

//    Ultimate

//      Dispatch es el mensaje, va al Store, luego se modifica el Reducer


export const getAllPokemon = () => async (dispatch) => {
    await fetch("http://localhost:3001/pokemon")
    .then(response => response.json())
    .then(data => {
        dispatch({ type: LIST_POKEMON, payload: data });
    })
    .catch(error => console.log(error.message));
}


export const getPokemonByName = (pokemonName) => async (dispatch) => {
    await fetch(`http://localhost:3001/pokemon?name=${ pokemonName }`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        dispatch({ type: "POKEMON_BY_NAME", payload: data });
    })
    .catch(error => console.log(error.message));
}


export const getPokemonByID = (idPokemon) => async (dispatch) => {
    await fetch(`http://localhost:3001/pokemon/${ idPokemon }`)
    .then(response => response.json())
    .then(data => {
        dispatch({ type: "POKEMON_DETAIL", payload: data });
    })
    .catch(error => console.log(error.message));
}


export const getPokemonByType = (payload) => {
    return {
        type: "POKEMON_BY_TYPE",
        payload
    }
}


//      Filtra los pokemon traidos de la API o creados por mi
export const filterByCreated = (payload) => {
    return{
        type: "EXISTING_BY_CREATED",
        payload
    }
}


//      Filtra los pokemon por ataque
export const orderByAttack = (payload) => {
    return{
        type: "ORDER_BY_ATTACK",
        payload
    }
}


export const setPokemon = (valor) => {
    return {
        type: "SET_DETAIL",
        payload: valor
    }
}


export const createPokemon = async (payload) => {
    try
    {
        const response = await fetch("http://localhost:3001/pokemon", {
            method: 'POST',
            body: JSON.stringify(payload),                      // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then( (res) => res.json() )
        .then(data => data)

        console.log(response);

        return response;
    }
    catch(err)
    {
        console.log({ error: err.message });
    }
}


export const filterByOrigen = (valor) => {
    return {
        type: "FILTER_BY_CREATED",
        payload: valor
    }
}


export const filterByTipo = (valor) => {
    return {
        type: "FILTER_BY_TYPE",
        payload: valor
    }
}

export const filterByAlphabet = (valor) => {
    return {
        type: "FILTER_BY_ALPHABET",
        payload: valor
    }
}

