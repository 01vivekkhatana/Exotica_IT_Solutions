import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { handleNavbarScroll, initializeHoverEffect, initScrollAnimations, initHamburgerMenu } from '../js/main';
import $ from 'jquery';



function Header() {
  const [logo, setLogo] = useState('');
  const [buttons, setButtons] = useState([]);
  const [contact, setContact] = useState([]);

  const [activeButton, setActiveButton] = useState('');
  const location = useLocation();

  useEffect(() => {
    const cleanupScroll = handleNavbarScroll();
    initializeHoverEffect();
    initScrollAnimations();
    initHamburgerMenu();

    // Set the active button based on the current URL path
    setActiveButton(location.pathname);

    return () => {
      cleanupScroll();
      $(".hamburger").off("click");
      $("#menu-header-menu li Link").off("click");
    };
  }, [location]);

  const handleButtonClick = (path) => {
    setActiveButton(path);
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/header')
      .then(res => res.json())
      .then(data => {
        setLogo(data.logo || '');
        setButtons(data.buttons || []);
        setContact(data.contact || []);
      })
      .catch(err => console.error('Error fetching header data:', err));
  }, []);

  return (
    <header id="header" className="header">
      <div className="header_inner flex justify-between align-center">
        <div className="logo">
          <motion.img
            src={logo}
            alt="logo"
            initial={{ x: '-100vw', opacity: 0, rotateY: -90 }} // Start off-screen to the left and rotated
            animate={{ x: 0, opacity: 1, rotateY: 0 }} // Slide to the original position, fade in, and rotate to 0
            transition={{ duration: 1, ease: 'easeOut' }} // Increase duration for a slower animation
            style={{ perspective: 1000 }} // Add perspective for 3D effect
          />
        </div>
        <nav className="navbar">
          <ul className="flex justify-between align-center">
            {buttons.map((button, index) => (
              <li key={index}>
                <Link
                  to={button.url}
                  className={activeButton === button.url ? 'theme_btn' : ''} // Apply 'theme_btn' based on the button's URL
                  onClick={() => handleButtonClick(button.url)} // Set the active button based on the button's URL
                >
                  {button.text}
                </Link>
              </li>
            ))}

            <span className="animate_menu"></span>
          </ul>
        </nav>
        <div className="header_links">
          <ul className="flex justify-between align-center">
            {contact.map((cont, index) => (
              <li key={index}>
                <Link to={`tel:${cont.phone}`}>
                  <span><img src={cont.flag_logo} alt="img" />{cont.phone}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
