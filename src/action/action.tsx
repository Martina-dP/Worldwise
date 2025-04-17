import axios from "axios";
import { Country } from "../interfaces/interfaces";

export const GET_COUNTRIES = "GET_COUNTRIES";

interface GetCountriesAction {
    type: typeof GET_COUNTRIES;
    payload: Country[]; 
}

export type AppDispatch = (action: GetCountriesAction) => void;

export function getCountries() {
    return async (dispatch: AppDispatch) => {
        try {
        const response = await axios.get<Country[]>("https://restcountries.com/v3.1/all");
        dispatch({
            type: GET_COUNTRIES,
            payload: response.data,
        });
        } catch (error) {
        console.error("Error fetching countries:", error);
        }
    };
}