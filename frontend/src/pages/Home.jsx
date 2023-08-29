import '../styles/home.scss';

const Home = (_) => {
  return (
    <section id="home">
      <section className="headings">
        <h1>Welcome to NFL Last Longer</h1>
        <p className="subheading">
          Please login or register to become part of the best fantasy football
          pool
        </p>
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
