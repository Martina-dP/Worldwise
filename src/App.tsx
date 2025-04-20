import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
// import Details from './pages/Details/details';
import Favorites from './pages/Favorites/favorites';


const App: React.FC = () => {
  return (
    <Provider store={store}> 
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/country/:id" element={<Details />} /> */}
        <Route path="/countries/favorites" element={<Favorites />} />
      </Routes>
    </Provider>
  );
};

export default App;

