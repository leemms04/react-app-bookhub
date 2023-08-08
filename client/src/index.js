import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Route, Routes
} from 'react-router-dom';
import { AppProvider } from './context';
import './index.css';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Edit from './components/Edit/Edit';
import MyBooks from './pages/MyBooks/MyBooks';
import BookList from './components/BookList/BookList';
import BookDetails from './components/BookDetails/BookDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />}>
        <Route path = "about" element = {<About />} />
            <Route path = "mybooks" element = {<MyBooks />} />
            <Route path = "book" element = {<BookList />} />
            <Route path = "/book/:id" element = {<BookDetails />} />
            <Route path = "/edit/:id" element = {<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppProvider>
);
