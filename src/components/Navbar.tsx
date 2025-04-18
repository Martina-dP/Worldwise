import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Worldwise</h2>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/countries/favorites" style={styles.link}>Favorites</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '60px',
    padding: '0 20px',
    backgroundColor: 'var(--color-primary-dark)',
    color: 'var(--color-light)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000
  } as React.CSSProperties,
  link: {
    color: 'white',
    textDecoration: 'none',
    marginLeft: '15px'
  } as React.CSSProperties,
  logo: {
    margin: 0
  } as React.CSSProperties
};

export default Navbar;

