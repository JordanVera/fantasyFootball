import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

import 'react-toastify/dist/ReactToastify.css';
import '@theme-toggles/react/css/within.css';

const light = {
  palette: {
    primary: {
      main: '#FF9505',
    },
    mode: 'light',
  },
};

const dark = {
  palette: {
    primary: {
      main: '#FF9505',
    },
    mode: 'dark',
  },
};

function App() {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <>
      <Router>
        <ThemeProvider theme={theme ? createTheme(dark) : createTheme(light)}>
          <Container>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Container>
        </ThemeProvider>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
