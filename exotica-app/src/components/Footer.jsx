import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Footer() {
  const [footerData, setFooterData] = useState({
    mainLinks: [],
    services: [],
    email: '',
    phone: [],
    address: '',
    social: [],
    legal: []
  });

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/footer');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        setFooterData(data);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };

    fetchFooterData();
  }, []);

  return (
    <footer className="footer_wrap reveal">
      <div className="container">
        <div className="inner_footer_sec">
          <div className="main_footer">
            <div className="footer_link_list footer12301">
              <div className="footer_head">
                <h3>Main Links</h3>
              </div>
              <ul>
                {footerData.mainLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.url}>{link.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer_link_list footer123">
              <div className="footer_head">
                <h3>Services</h3>
              </div>
              <ul>
                {footerData.services.map((service, index) => (
                  <li key={index}>
                    <Link to={service.url}>{service.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer_link_list footer1230">
              <div className="footer_head">
                <h3>Email</h3>
              </div>
              <div className="menu_bars">
              <Link to={`mailto:${footerData.email}`}>{footerData.email}</Link>
              </div>
              <div className="footer_head phone_number">
                <h3>Phone</h3>
              </div>
              <div className="menu_bars">
                {footerData.phone.map((phone, index) => (
                  <div key={index}>
                   <Link to={`tel:${phone.number}`}>{phone.label}: {phone.number}</Link>
                    <br />
                  </div>
                ))}
              </div>
              <div className="footer_head phone_number">
                <h3>Address</h3>
              </div>
              <div className="menu_bars">
                <p>{footerData.address}</p>
              </div>
            </div>
            <div className="footer_link_list footer120">
              <div className="footer_head">
                <h3>Social</h3>
              </div>
              <ul id="menu_quick_links_menu" className="menu_bars_bottom">
                {footerData.social.map((social, index) => (
                  <li key={index}>
                    <Link to={social.url}>
                      <img src={social.iconPath} alt={social.text} />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="footer_head inform">
                <h3>Legal Information</h3>
              </div>
              <ul>
                {footerData.legal.map((legal, index) => (
                  <li key={index}>
                    <Link to={legal.url}>{legal.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom_footer">
        <div className="container">
          <div className="inner_content_copy">
          <p className="copy">Copyright© {new Date().getFullYear()} All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
