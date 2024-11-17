import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Projet from './pages/projet';
import Error from './pages/error'
import Header from "./components/header";
import Footer from "./components/footer";
import "./i18n";
import { LangProvider } from './context/langage';
import './styles_SCSS/app.scss';
import { ThemeProvider } from './context/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <React.Suspense>
      <Router >
      <ThemeProvider>
          <LangProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:id" element={<Projet />} />
              <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
          </LangProvider>
        </ThemeProvider>
      </Router>
    </React.Suspense>
  </React.StrictMode>
);
