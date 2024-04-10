import { NavLink } from 'react-router-dom';
import clsx from "clsx";
import css from './Navigation.module.css'

function Navigation() {
   const getNavLinkClassName = ({ isActive }) =>
  clsx(css.navLink, {
    [css.active]: isActive,
  });

  return (
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
  )
}

export default Navigation