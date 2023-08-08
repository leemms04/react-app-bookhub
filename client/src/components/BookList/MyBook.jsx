import React from 'react'
import { Link } from 'react-router-dom';
import './BookList.css';

const MyBook = (myBook) => {
  const handleDelete = () => {
    fetch(`http://localhost:8000/delete/${myBook.id}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         }
      })
        .then((res) => {
          console.log(res.status);
          return res.json();
        })
        .then((data) => {
          console.log(data);
        });
    
    window.location.reload();
  }
  
  return (
    <div className='book-item flex flex-column flex-sb'>
      <div className='book-item-img'>
        <img src= {myBook.cover_img} alt="cover" />
      </div>
      <div className='book-item-info text-center'>
        <Link to={`/edit/${myBook.id}`} {...myBook}>
          <div className='book-item-info-item title fw-7 fs-18'>
            <span>{myBook.title}</span>
          </div>
        </Link>
        
        <div className='book-item-info-item author fs-15'>
          <span className='text-capitalize fw-7'>Author: </span>
          <span>{myBook.author}</span>
        </div>

        <div className='book-item-info-item rating fs-15'>
          <span className='text-capitalize fw-7'>Rating: </span>
          <span>{myBook.rating}</span>
        </div>

        <div className='delete fs-12'>
          <button className='flex flex-c delete-btn' onClick={handleDelete}>delete book</button>
        </div>
      </div>
    </div>
  )
}

export default MyBook