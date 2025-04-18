import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { getCountries } from '../action/action';
import Card from '../components/Card/card';
import SearchForm from '../components/Form/form';
import style from './home.module.css';

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
      <h2 className={style.home_title} >Countries List</h2>
      <ul className={style.home_list}>
        {paises?.map((country) => {
          return (
            <Card
              key={country.id}
              id={country.id}
              name={country.name}
              flags={country.flags}
              isFavorite={country.isFavorite}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Home;

