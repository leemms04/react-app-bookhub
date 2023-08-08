import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../Loader/Loader';
import coverImg from '../../images/cover_not_found.png';
import './BookDetails.css';
import { FaArrowLeft } from 'react-icons/fa'; 


const URL = "https://openlibrary.org/works/";

const BookDetails = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    setLoading(true);

    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();
        console.log(data);

        if (data) {
          const {description, title, covers, subject_places, subject_times, subjects} = data;
          const newBook = {
            id: id,
            description: description ? description.value : "No description found",
            title: title,
            cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : coverImg,
            subject_places: subject_places ? subject_places.join(", ") : "No subject places found",
            subject_times: subject_times ? subject_times.join(", ") : "No subject times found",
            subjects: subjects ? subjects.slice(0, 10).join(", ") : "No subjects found",
            start_date: null,
            end_date: null,
            rating: -1,
            review: null
          };
          setBook(newBook);
        } else {
          setBook(null);
        }

        setLoading(false);

      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    
    getBookDetails();

  }, [id]);

  console.log(book);

  // Adds book to booklog. If book is already logged, navigate to
  // the edit page. If not, create a new booklog and navigate to 
  // the edit page.
  function handleAdd() {
    try {
      fetch("http://localhost:8000/mybook/" + id).then(
        res => res.json()).then(
          data => {
          const newBook = {
            id: id,
            description: book.description,
            title: book.title,
            cover_img: book.cover_img,
            subject_places: book.subject_places,
            subject_times: book.subject_times,
            subjects: book.subjects,
            start_date: data.start_date,
            end_date: data.end_date,
            rating: data.rating,
            review: data.review
          }
          setBook(newBook);
          console.log(book);
        })

      // log does not exist, create a new booklog
      if (book.start_date === undefined) {
        fetch("http://localhost:8000/create", {
          method: 'POST',
          body: JSON.stringify({id}),
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
          const newBook = {
            id: id,
            description: book.description,
            title: book.title,
            cover_img: book.cover_img,
            subject_places: book.subject_places,
            subject_times: book.subject_times,
            subjects: book.subjects,
            start_date: data.start_date,
            end_date: data.end_date,
            rating: data.rating,
            review: data.review
          }
          setBook(newBook);
          console.log(book);
        });
      } else {
        console.log("POST /create not working");
      }

    } catch(error) {
      console.log(error);
      setLoading(false);
    }

    navigate(`/edit/${id}`);
  }
  
  if (loading) return <Loading />;
  
  return (
    <section className='book-details'>
      <div className='container'>
        <button type = 'button' className='flex flex-c back-btn' 
          onClick={() => navigate("/book")}>
          <FaArrowLeft size={22} />
          <span className='fs-18 fw-6'>Go back</span>
        </button>

        <div className='book-details-content grid'>
          <div className='book-details-img'>
            <img src={book?.cover_img} alt="cover" />
          </div>
          <div className='book-details-info'>
            <div className='book-details-item title'>
              <span className='fs-18 fw-6'>{book?.title}</span>
            </div>
            <div className='book-details-item description'>
              <span>{book?.description}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject Places: </span>
              <span className='text-italic'>{book?.subject_places}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject Times: </span>
              <span className='text-italic'>{book?.subject_times}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subjects: </span>
              <span>{book?.subjects}</span>
            </div>
            <button type = 'button' className='flex flex-c add-btn' 
              onClick={handleAdd}>
              <span className='fs-18 fw-6'>Add Booklog</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookDetails