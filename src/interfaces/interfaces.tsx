import { 
    ADD_TO_FAVORITES,
    GET_COUNTRIES, 
    GET_COUNTRIES_BY_ID, 
    SEARCH_COUNTRIES,
    REMOVE_FROM_FAVORITES, 
    SORT_ALPHABETICALLY 
} from "../action/action"; 

export interface GetCountriesAction {
    type: typeof GET_COUNTRIES;
    payload: Country[]; 
}

export interface Country {
    id: string;
    name: { official: string }; 
    capital: string[]; 
    region: string;
    population: number;
    flags: { 
        svg: string;
    };
    languages: { 
        [key: string]: string;
    };
    timezones: string[];
    maps: { 
        googleMaps: string;
    };
    isFavorite?: boolean;
}

export interface GetCountryByIdAction {
    type: typeof GET_COUNTRIES_BY_ID;
    payload: Country; 
}

export interface SearchCountriesAction {
    type: typeof SEARCH_COUNTRIES; 
    payload: Country[];  
}

export interface SortAlphabetically {
    type: typeof SORT_ALPHABETICALLY;
    payload: string
}

export interface AddToFavoritesAction {
    type: typeof ADD_TO_FAVORITES;
    payload: string | number;
}

export interface RemoveFromFavoritesAction {
    type: typeof REMOVE_FROM_FAVORITES;
    payload: string | number;
}