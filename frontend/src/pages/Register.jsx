import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice.js';
import { TextField, Button } from '@mui/material';
import { HomeParticles } from '../components/HomeParticles.jsx';
import Spinner from '../components/Spinner';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passsword2: '',
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
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

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('passwords do not match', {
        theme: theme ? 'dark' : 'light',
      });
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme ? 'dark' : 'light');
  }, [theme]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="form login">
        <h1>
          <FaUser /> Register
        </h1>
        <p className="subheading">Please create an account</p>
        <form onSubmit={onSubmit}>
          <TextField
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            required
            label="Enter your screen name"
            variant="filled"
            fullWidth
          />
          <TextField
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            label="Enter your email"
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
            label="Enter your password"
            variant="filled"
            fullWidth
          />
          <TextField
            type="password"
            className="form-control"
            id="password2"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            label="Confirm your password"
            variant="filled"
            fullWidth
          />
          <Button fullWidth variant="contained" type="submit">
            submit
          </Button>
        </form>
      </section>

      <section className="particles">
        <HomeParticles />
      </section>
    </>
  );
}
