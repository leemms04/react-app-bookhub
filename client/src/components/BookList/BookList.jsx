import React from 'react'
import { useGlobalContext } from '../../context';
import Book from './Book';
import Loading from '../Loader/Loader';
import coverImg from '../../images/cover_not_found.png';
import './BookList.css';

const BookList = () => {
  const {books, loading, resultTitle} = useGlobalContext();
  const booksWithCovers = books.map((singleBook) => {
    return {
      // ... : spread operator
      ...singleBook,
      // more on works API: https://openlibrary.org/dev/docs/api/books 
      // example URL: https://openlibrary.org/works/OL45804W/Fantastic_Mr._FOX
      // removing /works/ to only get id
      id: (singleBook.id).replace("/works/", ""),
      // more on covers: https://openlibrary.org/dev/docs/api/covers
      cover_img: singleBook.cover_id ? 
        `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg` : coverImg
    }
  })

  console.log(booksWithCovers);

  if(loading) return <Loading />;
  
  return (
    <section className='booklist'>
      <div className='container'>
        <div className='section-title'> 
          <h2>{resultTitle}</h2>
        </div>
        <div className='booklist-content grid'>
          {
            booksWithCovers.slice(0, 30).map((item, index) => {
              return (
                <Book key={index} { ...item } ></Book>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default BookList