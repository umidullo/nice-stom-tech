import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import { ROUTES } from '~/router/routes';

const NavLinks = () => {
  return (
    <>
      {ROUTES.map((route) => (
        <li key={route.name}>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.active_link : styles.link
            }
            to={`/${route.path}`}
          >
            <div className="flex items-center">
              {route.icon}
              {route.name}
            </div>
          </NavLink>
        </li>
      ))}
    </>
  );
};

const Navbar = () => {
  return (
    <aside className={styles.navBar}>
      <div className={styles.navBar__wrapper}>
        <nav className={styles.nav}>
          <ul>
            <NavLinks />
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Navbar;
