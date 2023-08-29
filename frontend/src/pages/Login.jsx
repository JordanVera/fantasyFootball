import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice.js';
import { TextField, Button } from '@mui/material';
import { HomeParticles } from '../components/HomeParticles.jsx';
import Spinner from '../components/Spinner';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        theme: theme ? 'dark' : 'light',
      });
    }

    if (isSuccess || user) {
      navigate('/dashboard');
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme ? 'dark' : 'light');
  }, [theme]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="form login">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p className="subheading">Please login to get support</p>
        <form onSubmit={onSubmit}>
          <TextField
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email"
            required
            label="email"
            variant="filled"
            fullWidth
          />
          <TextField
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            placeholder="Enter your password"
            label="password"
            variant="filled"
            fullWidth
          />

          <Button fullWidth variant="contained" type="submit">
            submit
          </Button>
        </form>
        <Link to="/register" className="registerBtn">
          No Account? Register
        </Link>
      </section>
      <section className="particles">{/* <HomeParticles /> */}</section>
    </>
  );
}
