import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Projet from './pages/projet';
import Error from './pages/error'
import Header from "./components/header";
import Footer from "./components/footer";
import './styles_SCSS/app.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router basename='/Mahmoudou_Portfolio' >
      <Header />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<Projet />} />
        <Route path="*" element={<Error/>} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);
