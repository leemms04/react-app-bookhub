import React from 'react';
import "./About.css";
import aboutImg from "../../images/about-img.jpeg";

const About = () => {
  return (
    <section className='about'>
      <div className='container'>
        <div className='section-title'>
          <h2>About</h2>
        </div>

        <div className='about-content grid'>
          <div className='about-img'>
            <img src = {aboutImg} alt = "" />
          </div>
          <div className='about-text'>
            <h2 className='about-title fs-26 ls-1'>About BookHub</h2>
            <p className='fs-17'>Bookhub is a reading log site that enables users to search up books using the Open Library API 
            and add books to their booklog with dates, ratings, and reviews. </p>
            <p className='fs-17'>This project was created by Emma Lee. </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
