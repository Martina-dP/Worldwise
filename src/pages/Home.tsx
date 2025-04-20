import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { getCountries, SAVE_LOCAL } from '../action/action';
import SearchForm from '../components/Form/form'
import ListCountries from './ListCountries/listCountries';
import ResultsSearch from './Results_search/results_search';
import { Country } from '../interfaces/interfaces';

const Home: React.FC = () => {

  const [loadingData, setLoadingData] = React.useState(true);
  const [resetKey, setResetKey] = React.useState(0);

  const state = useSelector((state: RootState) => state.searchActive);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getCountries());
      setLoadingData(false);
    };
    fetchData();
    const getStorageData = localStorage.getItem("favorites");
    if (getStorageData) {
      const parsedFavorites: Country[] = JSON.parse(getStorageData);
            dispatch({
                type: SAVE_LOCAL,
                payload: parsedFavorites,
            });
    }
}, [dispatch]);

const resetSearch = () => {
  setResetKey(prevKey => prevKey + 1); 
}

  return (
    <div style={{ padding: '20px' }}>
      <SearchForm key={resetKey} />
        {loadingData ? (<p>Loading countries...</p> ) : (
          state ? <ResultsSearch resetSearch={resetSearch} /> : <ListCountries />
        )}
    </div>
  );
};

export default Home;

