import React from 'react';
import Navbar from '../Navbar/Navbar';
import SearchForm from '../SearchForm/SearchForm';
import './Header.css';

const Header = () => {
  return (
    <div className='holder'>
      <header className='header'>
        <Navbar />
        <div className='header-content flex flex ctext-center text-white'>
          <h2 className='header-title'>
            Keep Reading
          </h2><br/>
          <p className='header-text fs-18 fw-3'>books are uniquely portable magic.</p>
          <p className='header-text fs-14 fw-2'> - Stephen King - </p>
          <SearchForm />
        </div>
      </header>
    </div>
  )
}

export default Header;