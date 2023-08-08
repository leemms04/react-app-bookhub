import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../Loader/Loader';
import coverImg from '../../images/cover_not_found.png';
import './Edit.css';
import { FaArrowLeft } from 'react-icons/fa'; 
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ReactStars from 'react-stars';

const URL = "https://openlibrary.org/works/";

const Edit = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [star, setStar] = useState(5);
  const [review, setReview] = useState("");

  useEffect(() => {
    setLoading(true);

    async function getBookDetails() {
      try {
        let myData = null;
        fetch("http://localhost:8000/mybook/" + id)
          .then(res => res.json())
          .then(
            data => {
            console.log(data);
            myData = data;
          })
        
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();
        console.log(myData);
        console.log(data);
        
        if (myData && data) {
          const {description, title, covers, subject_places, subject_times, subjects} = data;
          const {start_date, end_date, rating, review} = myData;
          const newBook = {
            id: id,
            description: description ? description.value : "No description found",
            title: title,
            cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : coverImg,
            subject_places: subject_places ? subject_places.join(", ") : "No subject places found",
            subject_times: subject_times ? subject_times.join(", ") : "No subject times found",
            subjects: subjects ? subjects.slice(0, 10).join(", ") : "No subjects found",
            start_date: new Date(start_date),
            end_date: new Date(end_date),
            rating: rating,
            review: review
          };
          setBook(newBook);
          setStartDate(start_date);
          setEndDate(end_date);
          setStar(rating);
          setReview(review);
        } else {
          setBook(null);
          console.log("null");
        }

        setLoading(false);

      } catch(error) {
        console.log(error);
        setLoading(false);
      }
    }

    getBookDetails();

  }, [id]);

  function handleClick() {
    const editLog = {
      id: id,
      description: book.description,
      title: book.title,
      cover_img: book.cover_img,
      subject_places: book.subject_places,
      subject_times: book.subject_times,
      subjects: book.subjects,
      start_date: startDate,
      end_date: endDate,
      rating: star,
      review: review
    };
    setBook(editLog);
    console.log(book);

    try {
      fetch("http://localhost:8000/edit", {
        method: 'POST',
        body: JSON.stringify({
          id: id,
          start_date: book.start_date,
          end_date: book.end_date,
          rating: star,
          review: review
        }),
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
      })
        .then(res => {
          console.log(res.status);
          return res.json();
        })
        .then(data => {
          console.log(data);
          const updatedBook = {
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
          setBook(updatedBook);
          setStartDate(data.start_date);
          setEndDate(data.end_date);
          setStar(data.rating);
          setReview(data.review);

        })
        .catch(function(error) { 
          console.log('Request failed: ', error);
        });;
    } catch(err) {
      console.log(err);
    }
  }

  if (loading) return <Loading />;
  
  return (
    <section className='book-edit'>
      <div className='container'>
        <button type = 'button' className='flex flex-c back-btn' 
          onClick={() => navigate(`/book/${id}`)}>
          <FaArrowLeft size={22} />
          <span className='fs-18 fw-6'>Go back</span>
        </button>

        <div className='book-edit-content grid'>
          <div className='book-details-img'>
            <img src= {book?.cover_img} alt="cover" />
          </div>
          <div className='book-details-info'>
            <div className='book-details-item title'>
              <span className='fs-18 fw-6'>{book?.title}</span>
            </div>
            <form>
              <div className='book-details-item'>
                <span className='fw-6'>Start date: </span>
                <DatePicker dateFormat="MM-dd-yyyy" selected={new Date(startDate)} onChange={(date) => {
                  setStartDate(date);
                  console.log(date);
                }} />
              </div>
              <div className='book-details-item'>
                <span className='fw-6'>End date: </span>
                <DatePicker dateFormat="MM-dd-yyyy" selected={new Date(endDate)} onChange={(date) => {
                  setEndDate(date);
                  console.log(date);
                }} />
              </div>
              <div className='book-details-item'>
                <span className='fw-6'>Rating: </span>
                <ReactStars
                  count={5}
                  name="rating"
                  value={star}
                  half={true}
                  edit={true}
                  onChange={(rating) => {
                    setStar(rating);
                    console.log(rating);
                  }}
                  size={24}
                  color2={'#9ed2be'} />
              </div>
              <div className='book-details-item'>
                <div className='fw-6'>
                  <label htmlFor="review">Review:</label>
                </div>
                <div >
                  <textarea 
                    className='book-details-textarea fs-14'
                    name="review"
                    id="review" 
                    value={review}
                    onChange={(e) => {
                      setReview(e.target.value);
                      console.log(e.target.value);
                    }}
                    cols="50" rows="10"></textarea>
                </div>
              </div>
              <div className="form-control">
                <button type='button' onClick={handleClick} className='flex flex-c save-btn'>
                  <span className='fs-18 fw-6'>Save Booklog</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Edit