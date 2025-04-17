import { 
    GET_COUNTRIES, 
    GET_COUNTRIES_BY_ID,
    SEARCH_COUNTRIES,
    SORT_ALPHABETICALLY , 
    ADD_TO_FAVORITES, 
    REMOVE_FROM_FAVORITES
} from "../action/action"; 

import { 
    AddToFavoritesAction,
    Country, 
    GetCountriesAction, 
    GetCountryByIdAction, 
    SearchCountriesAction,
    RemoveFromFavoritesAction, 
    SortAlphabetically 
} from "../interfaces/interfaces";

interface State {
    countries: Country[];
    favorites: Country[];
    country: Country | null;
    resultSearch: Country[];
}

const initialState: State = {
    countries: [],
    favorites: [],
    country: null,
    resultSearch: [],
};

type Action = 
    | GetCountriesAction 
    | GetCountryByIdAction 
    | SearchCountriesAction
    | SortAlphabetically 
    | AddToFavoritesAction 
    | RemoveFromFavoritesAction;

const reducer = (state = initialState, action: Action): State => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload as Country[]
            };
        case GET_COUNTRIES_BY_ID:
            return {
                ...state,
                country: action.payload as Country,
            };
        case SEARCH_COUNTRIES:
            return {
                ...state,
                resultSearch: action.payload as Country[], 
            };
        case SORT_ALPHABETICALLY:
            return {
                ...state,
                countries: [...state.countries].sort((a, b) => {
                    return action.payload === "asc"
                        ? a.name.official.localeCompare(b.name.official, undefined, { sensitivity: 'base' })
                        : b.name.official.localeCompare(a.name.official, undefined, { sensitivity: 'base' });
                }),
            };
        case ADD_TO_FAVORITES:
            {
                const countryToAdd = state.countries.find((country) => country.id === action.payload);
                if (countryToAdd && !state.favorites.some((favorite) => favorite.id === action.payload)) {
                    return {
                        ...state,
                        favorites: [...state.favorites, countryToAdd], 
                    };
                }
                return state;
            }
        case REMOVE_FROM_FAVORITES:
            return {
                ...state,
                favorites: state.favorites.filter((country) => country.id !== action.payload), 
            };
        default:
            return state;
    }
};

export default reducer;