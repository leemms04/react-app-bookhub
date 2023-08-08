import React, { useRef, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import './SearchForm.css';

const SearchForm = () => {
  // global context provided by context.js
  const {setSearchTerm, setResultTitle} = useGlobalContext();
  const searchText = useRef('');
  const navigate = useNavigate();

  useEffect(() => searchText.current.focus(), []);
  const handleSubmit = (e) => {
    e.preventDefault();
    let tempSearchTerm = searchText.current.value.trim();
    // /: beginning of a RegEx expression
    // [^]: find any character NOT in the brackets
    // \w: looks for all word characters in a string
    // \s: looks for all whitespace characters
    // /gi: global case-insensitive search of all occurrences
    //
    // if tempSearchterm does not include a valid book title:
    if ((tempSearchTerm.replace(/[^\w\s]/gi,"")).length === 0) {
      setSearchTerm("the lost world");
      setResultTitle("Please Enter Something ... ");
    } else {
      setSearchTerm(searchText.current.value);
    }

    navigate("/book");
  };

  return (
    <div className='search-form'>
      <div className='container'>
        <div className='search-form-content'>
          <form className='search-form' onSubmit={handleSubmit}>
            <div className='search-form-elem flex flex-sb bg-white'>
              <input type="text" className='form-control' 
              placeholder='The Lost World ...' ref={searchText}/>
              <button type='submit' className='flex flex-c' onClick={handleSubmit}>
                <FaSearch className='text-green' size={32}/>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SearchForm