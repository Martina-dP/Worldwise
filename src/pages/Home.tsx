import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { getCountries } from '../action/action';
import SearchForm from '../components/Form/form'
import ListCountries from './ListCountries/listCountries';

const Home: React.FC = () => {

  const paises = useSelector((state: RootState) => state.countries);
  console.log('countriesList', paises);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCountries());
}, [dispatch]);

  return (
    <div style={{ padding: '20px' }}>
      <SearchForm />
      <ListCountries /> 
    </div>
  );
};

export default Home;

