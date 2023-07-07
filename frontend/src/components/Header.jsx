import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice.js';
import { Within } from '@theme-toggles/react';
import { TextField, Button } from '@mui/material';
import { toggleTheme } from '../features/theme/themeSlice.js';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const theme = useSelector((state) => state.theme.theme);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">NFL Last Longer</Link>
      </div>
      <ul>
        <Within
          toggled={theme}
          toggle={handleThemeToggle}
          className="menuIcon themeToggle"
        />
        {user ? (
          <li>
            <Button className="button" variant="text" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </Button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
