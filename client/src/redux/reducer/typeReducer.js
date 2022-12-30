import { LIST_TYPE } from "../../utils/global.js"

const initialState = {
    listType: [],
    error: "",
    loading: false
};

const typeReducer = (state = initialState, action) => {
    switch(action.type){
        case "LIST_TYPE":
            return {
                ...state,
                listType: action.payload
            };

        default:
            return state;
    }
};

export default typeReducer;
