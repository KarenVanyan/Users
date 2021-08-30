import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const routes = [{
  name: 'Profile',
  route: './profile'
}, {
  name: 'Users',
  route: './users'
}, {
  name: 'Dashboard',
  route: './dashboard'
}];

export const Header = () => (
  <div className={styles.headerWrapper}>
    {routes.map((value, index) => (
      <button key={index} className={styles.button}>
        <Link
          to={value.route}
        >
          {value.name}
        </Link>
      </button>
    ))}
  </div>
);

export default Header;
