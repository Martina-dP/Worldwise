import axios from "axios";
import { 
    AddToFavoritesAction,
    Country, 
    GetCountriesAction, 
    GetCountryByIdAction, 
    RemoveFromFavoritesAction, 
    SortAlphabetically 
} from "../interfaces/interfaces";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_BY_ID = "GET_COUNTRIES_BY_ID";
export const SEARCH_COUNTRIES = "SEARCH_COUNTRIES";
export const SORT_ALPHABETICALLY = "SORT_ALPHABETICALLY";
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";

export type AppDispatch = (action: 
                                GetCountriesAction | 
                                GetCountryByIdAction | 
                                SortAlphabetically |
                                AddToFavoritesAction |
                                RemoveFromFavoritesAction
                            ) => void;

export function getCountries() {
    return async (dispatch: AppDispatch) => {
        try {
        const response = await axios.get<Country[]>("https://restcountries.com/v3.1/all");
        const filteredData: Country[] = response.data.map((country: any) => ({
            id: country.cca3,
            name: { official: country.name?.official || country.name?.common },
            capital: country.capital,
            region: country.region,
            population: country.population || 0,
            flags: { svg: country.flags?.svg },
            languages: country.languages ,
            timezones: country.timezones ,
            maps: { googleMaps: country.maps?.googleMaps},
        }));
    
        dispatch({
            type: GET_COUNTRIES,
            payload: filteredData,
        });
        } catch (error) {
        console.error("Error fetching countries:", error);
        }
    };
}

export function getDetail(id: string | number) : (dispatch: AppDispatch) => void {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.get<Country>(`https://restcountries.com/v3.1/alpha/${id}`);
            dispatch({
                type: GET_COUNTRIES_BY_ID,
                payload: response.data
            });
        } catch (error) {
            console.error("Error fetching country details:", error);
        }
    };
}

export function searchCountries(searchTerm: string, filterBy: 'name' | 'languages' | 'timezones') {
    return async (dispatch: any) => {
        try {
            const response = await axios.get<Country[]>(`https://restcountries.com/v3.1/all`);
            const filteredCountries = response.data.filter((country) => {
                if (filterBy === "name") {
                    return country.name.official.toLowerCase().includes(searchTerm.toLowerCase());
                } else if (filterBy === "languages") {
                    return Object.values(country.languages).some((language) =>
                        language.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                } else if (filterBy === "timezones") {
                    return country.timezones.some((timezone) =>
                        timezone.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }
                return false;
            });
            dispatch({
                type: SEARCH_COUNTRIES,
                payload: filteredCountries
            });
        } catch (error) {
        console.error("Error fetching countries:", error);
        }
    };
}

export function orderAlfabeticamente(payload: string): SortAlphabetically {
    return {
        type: SORT_ALPHABETICALLY,
        payload,
    };
}

export function addToFavorites(countryId: string | number) : AddToFavoritesAction {
    return {
        type: ADD_TO_FAVORITES,
        payload: countryId,
    };
}

export function removeFromFavorites(countryId: string | number) : RemoveFromFavoritesAction {
    return {
        type: REMOVE_FROM_FAVORITES,
        payload: countryId,
    };
}