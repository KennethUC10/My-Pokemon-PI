
//          Ultimate
//      Aqui esta la informacion que mis componentes usaran

import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import pokemonReducer from "../reducer/pokemonReducer";
import typeReducer from "../reducer/typeReducer";

const rootReducer = combineReducers({
    pokemon: pokemonReducer,
    type: typeReducer
});

const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk))
);

export default store;

