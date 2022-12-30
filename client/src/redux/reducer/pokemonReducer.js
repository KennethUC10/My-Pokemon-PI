import { LIST_POKEMON } from "../../utils/global.js"

//import { LIST_POKEMON } from "../actions/pokemonAction.js";


const initialState = {
    listPokemon: [],
    allPokemon: [],                 //      Esto sera backup para listPokemon

    listType: [],
    pokemonDetail: {},
    pokemonByName: {},
    pokemonByType: [],
    pokemonByOrigin: [],
    error: "",
    loading: false,

    filtrado: {
        origen: "ALL",
        tipo: "ALL",
        alfabeticamente: "ALL"
    }
};


const pokemonReducer = (state = initialState, action) => {
    switch(action.type){
        case "LIST_POKEMON":
            return {
                ...state,
                listPokemon: action.payload,
                allPokemon: action.payload,

                pokemonByName: action.payload,
                pokemonByType: action.payload,
                pokemonByOrigin: action.payload
            };

        case "LIST_TYPE":
            return {
                ...state,
                listType: action.payload
            };
    
        //  case "SET_DETAIL":
        case "POKEMON_DETAIL":
            return {
                ...state,
                pokemonDetail: action.payload
            }

        case "POKEMON_BY_NAME":
            return {
                ...state,
                pokemonByName: action.payload,
                listPokemon: []
            };


        case "FILTER_BY_CREATED":
            //const allPokemon2 = state.allPokemon;
            //const pokemonCreated = action.payload === "created" ? state.allPokemon.filter(p => p.createInDB) : state.allPokemon.filter(p => !p.createInDB);
            //const pokemonCreated = action.payload === "created" ? allPokemon2.filter(p => p.createInDB === true) : allPokemon2.filter(p => p.createInDB !== true);
            //const pokes2 = state.pokemonByType.length > 0 ? pokemonFilter.filter(p => state.pokemonByType.includes(p)) : pokemonFilter;
            //const createdFilter = action.payload === "created" ? state.allPokemon.filter(e => e.createInDB) : state.allPokemon.filter(e => !e.createInDB);

            return {
                ...state,
                //listPokemon: action.payload === "all" ? state.allPokemon : createdFilter
                filtrado: { ...state.filtrado, origen: action.payload }
            }

        case "FILTER_BY_TYPE":
            /*
            const listPokemon = state.pokemonByName;
            const allPokemonByType = state.allPokemon
            const pokemonByType = action.payload === "All" ? listPokemon : types?.filter(e => e.type.map(t => t.name).includes(action.payload));
            const pokemonByTypes = [];
            for (const pokemon of allPokemonByType) {
                if(pokemon.type.includes(action.payload))
                {
                    pokemonByTypes.push(pokemon);
                }
            }
            const pokemonByType = action.payload === "All" ? allPokemonByType : allPokemonByType.filter(e => e.type.map(t => t.name).includes(action.payload));
            */

            return {
                ...state,
                filtrado: { ...state.filtrado, tipo: action.payload }
            }


        case "FILTER_BY_ALPHABET":
            return{
                ...state,
                filtrado: { ...state.filtrado, alfabeticamente: action.payload }
            }


        default:
            return state;
    }
};

export default pokemonReducer;
