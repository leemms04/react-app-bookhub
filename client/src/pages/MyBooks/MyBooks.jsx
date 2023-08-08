import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../../context';
import MyBook from '../../components/BookList/MyBook'
import Loading from '../../components/Loader/Loader';
import coverImg from '../../images/cover_not_found.png';
import './MyBooks.css';

const URL = "https://openlibrary.org";

const MyBooks = () => {
    const [myBooks, setMyBooks] = useState([]);

    useEffect(() => {
      
      // Gets local booklog data from backend (id, rating)
      async function getLocalData() {
        const localBooks = await fetch("http://localhost:8000/mybooks");
        const localData = await localBooks.json();

        const books = await Promise.all(
          localData.map(async singleBook => {
            const { id } = singleBook;
            const bookLogs = await getBookData(id, singleBook);
            console.log(bookLogs);
            return bookLogs;
          })
        )
        setMyBooks(books);
      }

      // Gets book data from OpenBook API (title, author, cover_img)
      async function getBookData(id, singleBook) {
        const books = await fetch(`${URL}/works/${id}.json`);
        const data = await books.json();
        const {title, authors, covers} = data;
        const newBook = {
          id: singleBook.id,
          rating: singleBook.rating,
          title: title,
          author: getAuthorData(authors),
          cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : coverImg
        }
        console.log(newBook);
        return newBook;
      }

      // Gets author name from OpenBook API
      function getAuthorData(authors) {
        fetch(`${URL}${authors[0].author.key}.json`)
          .then((res) => res.json())
          .then((data) => {
            return data;
          })
      }
      
      getLocalData();
      
    }, []);

    const {loading} = useGlobalContext();
  
    if(loading) return <Loading />;
    
    return (
      <section className='booklist'>
        <div className='container'>
          <div className='section-title'>
            <h2>my books</h2>
          </div>
          <div className='booklist-content grid'>
            {
              myBooks.map((item, index) => {
                return (
                  <MyBook key={index} { ...item } ></MyBook>
                )
              })
            }
          </div>
        </div>
      </section>
    )
  }

export default MyBooks