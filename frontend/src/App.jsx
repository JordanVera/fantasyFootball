import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Container from '@mui/material/Container';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import 'react-toastify/dist/ReactToastify.css';
import '@theme-toggles/react/css/within.css';

function App() {
  return (
    <>
      <Router>
        <Container>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
