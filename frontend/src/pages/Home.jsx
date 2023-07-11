import { HomeParticles } from '../components/HomeParticles';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

import '../styles/home.scss';

const Home = () => {
  return (
    <section id="home">
      <section className="headings">
        <h1>Welcome to NFL Last Longer</h1>
        <p className="subheading">
          Please login or register to become part of the best fantasy football
          pool
        </p>
        {/* <Link to="/login">
          <Button
            className="homeBtn"
            variant="contained"
            startIcon={<FaSignInAlt />}
          >
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button
            className="homeBtn"
            variant="contained"
            startIcon={<FaUser />}
          >
            Register
          </Button>
        </Link> */}
      </section>
      <video id="backgroundVideo" autoPlay muted loop playsInline>
        <source
          src="https://www.dropbox.com/s/cb19o9iy8ossfdk/bannerVideo%20copy.mp4?raw=1"
          type="video/mp4"
        />
      </video>
    </section>
  );
};

export default Home;
