import axios from "axios";
import { 
    AddToFavoritesAction,
    Country, 
    GetCountriesAction, 
    GetCountryByIdAction, 
    SearchCountriesAction,
    RemoveFromFavoritesAction, 
    SortAlphabetically 
} from "../interfaces/interfaces";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_BY_ID = "GET_COUNTRIES_BY_ID";
export const SEARCH_COUNTRIES = "SEARCH_COUNTRIES";
export const SORT_ALPHABETICALLY = "SORT_ALPHABETICALLY";
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";
export const CLEAR_RESULTS = "CLEAR_RESULTS";
export const SAVE_LOCAL = "SAVE_LOCAL";

export type AppDispatch = (action: 
                                GetCountriesAction | 
                                GetCountryByIdAction | 
                                SearchCountriesAction |
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
            name: { 
                common: country.name?.common || country.name?.official || '',
            },
            capital: country.capital,
            region: country.region,
            population: country.population || 0,
            flags: { 
                svg: country.flags?.svg || country.flags?.png || '',
                png: country.flags?.png || country.flags?.svg || ''
            },
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

export function searchCountries(
    filters: {
        name?: string;
        languages?: string;
        timezones?: string;
    }
) {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.get<any[]>(
                'https://restcountries.com/v3.1/all'
            );

            const filteredCountries = response.data
                .filter((country) => {
                    const matchesName = filters.name
                        ? (
                            country.name?.common?.toLowerCase().includes(filters.name.toLowerCase()) ||
                            Object.values(country.name?.nativeName || {}).some((n: any) =>
                                n.common.toLowerCase().includes(filters.name!.toLowerCase())
                            )
                        )
                        : true;

                    const matchesLanguage = filters.languages
                        ? Object.values(country.languages || {}).some((lang: any) =>
                            lang.toLowerCase().includes(filters.languages!.toLowerCase())
                        )
                        : true;

                    const matchesTimezone = filters.timezones
                        ? (country.timezones || []).some((tz: string) =>
                            tz.toLowerCase().includes(filters.timezones!.toLowerCase())
                        )
                        : true;

                    return matchesName && matchesLanguage && matchesTimezone;
                })
                .map((country): Country => ({
                    id: country.cca3,
                    name: {
                        common: country.name?.common || '',
                    },
                    capital: country.capital || [],
                    region: country.region || '',
                    population: country.population || 0,
                    flags: {
                        svg: country.flags?.svg || '',
                        png: country.flags?.png || '',
                    },
                    languages: country.languages || {},
                    timezones: country.timezones || [],
                    maps: {
                        googleMaps: country.maps?.googleMaps || '',
                    },
                    isFavorite: false,
                }));

            dispatch({
                type: SEARCH_COUNTRIES,
                payload: filteredCountries,
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

export function clearSearchResults() {
    return {
        type: CLEAR_RESULTS,
    };
}

export function SaveLocal(favorites: Country) {
    return {
        type: SAVE_LOCAL,
        payload: favorites,
    };
}