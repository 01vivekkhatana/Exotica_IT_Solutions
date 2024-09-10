import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/style.css';
import './fonts/poppins/demo';
import Dashboard from './Admin/dashboard/dashboard';
import './Admin/css/dashboard.css'
import Header_dynamic from './Admin/pages/Header_dy';
import Footer_dynamic from './Admin/pages/Footer_dy';
import Home_dynamic from './Admin/pages/Home_dy';
import Signin from './Admin/Sign-in';
import AboutUs from './pages/Aboutus';
import PrivateRouter from './PrivateRoute'
import Gallery_images from './Admin/pages/Gallery_images';
import { v4 as uuidv4 } from 'uuid';

function App() {

  useEffect(() => {
    const tokenKey = 'userToken';
    let token = localStorage.getItem(tokenKey);

    if (!token) {
    
      token = uuidv4();
      localStorage.setItem(tokenKey, token);
      
      incrementViewCount(token);
    }
  }, []);

  const incrementViewCount = async (token) => {
    try {
      const response = await fetch('/api/increment-view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      if (!response.ok) {
        throw new Error('Failed to increment view count');
      }
      console.log('View count incremented');
    } catch (error) {
      console.error('Errorr:', error);
    }
  };

  return (
        <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about_us" element={<AboutUs />} />
      <Route exact path="/admin" element={<Signin/>} />
      <Route element={<PrivateRouter />}> 
      <Route exact path="/admin/dashboard" element={<Dashboard/>} />
      <Route exact path="/admin/header_dynamic" element={<Header_dynamic/>} />
      <Route exact path="/admin/footer_dynamic" element={<Footer_dynamic/>} />
      <Route exact path="/admin/home_dynamic" element={<Home_dynamic/>} />
      <Route exact path="/admin/gallery_images" element={<Gallery_images/>} />
      </Route>
      </Routes>
      </Router>
  );
}

export default App;
