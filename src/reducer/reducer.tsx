import { GET_COUNTRIES } from "../action/action"; 
import { Country } from "../interfaces/interfaces";

interface State {
    countries: Country[];
}

interface Action {
type: string; 
payload?: string | number | object | boolean | Country[]; 
}

const initialState: State = {
    countries: [],
};

const reducer = (state = initialState, action: Action): State => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload as Country[]
            };
        default:
        return state;
    }
};

export default reducer;