import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { getCountries } from '../action/action';

const Home: React.FC = () => {

  const paises = useSelector((state: RootState) => state.countries);
  console.log('countriesList', paises);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCountries());
}, [dispatch]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the Home Page</h1>
      <p>This is your basic home screen content.</p>
    </div>
  );
};

export default Home;

