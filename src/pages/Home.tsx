import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { getCountries } from '../action/action';
import SearchForm from '../components/Form/form'
import ListCountries from './ListCountries/listCountries';
import ResultsSearch from './Results_search/results_search';

const Home: React.FC = () => {

  const state = useSelector((state: RootState) => state.searchActive);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCountries());
}, [dispatch]);

  return (
    <div style={{ padding: '20px' }}>
      <SearchForm />
      {state ? <ResultsSearch /> : <ListCountries />}
    </div>
  );
};

export default Home;

