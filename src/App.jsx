import {lazy, Suspense} from 'react'
import { NavLink, Route, Routes } from "react-router-dom";
 import clsx from "clsx";
import Loader from "./components/Loader/Loader";
import css from "./App.module.css";

function App() {

  
  
 

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const NotFound = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

  

  const getNavLinkClassName = ({ isActive }) =>
  clsx(css.navLink, {
    [css.active]: isActive,
  });
   

  return (
   <div>
      <header>
        <nav>
          <NavLink className={getNavLinkClassName} to="/">
            Home    | 
          </NavLink>
          <NavLink className={getNavLinkClassName} to="/movies">
           |       Movies
          </NavLink>
        </nav>
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <footer>The data are taken from themoviedb.org <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="themoviedb.org logo" /></footer>
    </div>
  );
}

export default App;
