import { 
    GET_COUNTRIES, 
    GET_COUNTRIES_BY_ID,
    SEARCH_COUNTRIES,
    SORT_ALPHABETICALLY , 
    ADD_TO_FAVORITES, 
    REMOVE_FROM_FAVORITES,
    CLEAR_RESULTS,
    SAVE_LOCAL,
    REMOVE_ITEM
} from "../action/action"; 

import { 
    AddToFavoritesAction,
    Country, 
    GetCountriesAction, 
    GetCountryByIdAction, 
    SearchCountriesAction,
    RemoveFromFavoritesAction, 
    SortAlphabetically, 
    RemoveItemAction,
    SaveLocalAction,
    ClearResultsAction
} from "../interfaces/interfaces";

interface State {
    countries: Country[];
    favorites: Country[];
    country: Country | null;
    resultSearch: Country[];
    searchActive: boolean;
}

const initialState: State = {
    countries: [],
    favorites: [],
    country: null,
    resultSearch: [],
    searchActive: false,
};

type Action = 
    | GetCountriesAction 
    | GetCountryByIdAction 
    | SearchCountriesAction
    | SortAlphabetically 
    | AddToFavoritesAction 
    | RemoveFromFavoritesAction
    | ClearResultsAction
    | SaveLocalAction 
    | RemoveItemAction;

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
                searchActive: true,
            };
        case SORT_ALPHABETICALLY:
            return {
                ...state,
                countries: [...state.countries].sort((a, b) => {
                    return action.payload === "asc"
                        ? a.name.common.localeCompare(b.name.common, undefined, { sensitivity: 'base' })
                        : b.name.common.localeCompare(a.name.common, undefined, { sensitivity: 'base' });
                }),
            };
        case ADD_TO_FAVORITES:
            {
                const countryToAdd = state.countries.find((country) => country.id === action.payload);
                if (countryToAdd && !state.favorites.some((favorite) => favorite.id === action.payload)) {
                    const addedFavorite = [...state.favorites, countryToAdd]
                    localStorage.setItem("favorites", JSON.stringify(addedFavorite));
                    return {
                        ...state,
                        favorites: addedFavorite,
                    };
                }
                return state;
            }
        case REMOVE_FROM_FAVORITES:{
            const removedFavorite = state.favorites.filter((country) => country.id !== action.payload);
            localStorage.setItem("favorites", JSON.stringify(removedFavorite));
            return {
                ...state,
                favorites: removedFavorite
            };
        }
        case SAVE_LOCAL: 
            return {
                ...state,
                favorites: action.payload as Country[]
            }
        case CLEAR_RESULTS:
            return {
                ...state,
                resultSearch: [], 
                searchActive: false, 
            }
        case REMOVE_ITEM: 
            return {
                ...state,
                countries: state.countries.filter((country) => country.id !== action.payload),
            };
        default:
            return state;
    }
};

export default reducer;