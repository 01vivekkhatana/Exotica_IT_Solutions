import React, { useEffect, useState, useRef } from 'react';
import $ from 'jquery';
import Sidebar from '../components/Sidebar';
import ListIcon from '@mui/icons-material/List';
import { Link } from 'react-router-dom';

function Dashboard() {

  const navigationRef = useRef(null);
  const mainRef = useRef(null);
  const toggleRef = useRef(null);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch('http://localhost:5000/emails'); 
        const data = await response.json();
        setEmails(data);
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    };

    fetchEmails();
  }, []);

  useEffect(() => {
    const listItems = $(navigationRef.current).find('li');
    listItems.on('mouseover', function () {
      listItems.removeClass('hovered');
      $(this).addClass('hovered');
    });

   
    $(toggleRef.current).on('click', () => {
      $(navigationRef.current).toggleClass('active');
      $(mainRef.current).toggleClass('active');
    });

   
    return () => {
      listItems.off('mouseover');
      $(toggleRef.current).off('click');
    };
  }, []);

  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="main" ref={mainRef}>
          <div className="topbar">
            <div className="toggle" ref={toggleRef}>
              <ListIcon />
             
            </div>
            <Link to="/">Home</Link>
            <div className="search">
              <label>
                <input type="text" placeholder="Search here" />
                <ion-icon name="search-outline"></ion-icon>
              </label>
            </div>
            <div className="user">
              <img src="technology.png" alt="" />
            </div>
          </div>

          <div className="cardBox">
            <div className="card">
              <div>
                <div className="numbers">250+</div>
                <div className="cardName">Daily Views</div>
              </div>
              <div className="iconBx">
                <ion-icon name="eye-outline"></ion-icon>
              </div>
            </div>
           
            <div className="card">
              <div>
                <div className="numbers">80</div>
                <div className="cardName">Sales</div>
              </div>
              <div className="iconBx">
                <ion-icon name="cart-outline"></ion-icon>
              </div>
            </div>
            <div className="card">
              <div>
                <div className="numbers">284</div>
                <div className="cardName">Comments</div>
              </div>
              <div className="iconBx">
                <ion-icon name="chatbubbles-outline"></ion-icon>
              </div>
            </div>
            <div className="card">
              <div>
                <div className="numbers">$7,842</div>
                <div className="cardName">Earning</div>
              </div>
              <div className="iconBx">
                <ion-icon name="cash-outline"></ion-icon>
              </div>
            </div>
          </div>

          <div className="details">
            <div className="recentOrders">
              <div className="cardHeader">
                <h2>Recent Clients</h2>
                <a href="#" className="btn">View All</a>
              </div>
              <table>
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Phone</td>
                    <td>Message</td>
                    <td>Sent At</td>
                  </tr>
                </thead>
                <tbody>
                  {emails.length > 0 ? (
                    emails
                      .slice()
                      .reverse()
                      .map((email) => (
                        <tr key={email._id}>
                          <td>{`${email.firstName} ${email.lastName}`}</td>
                          <td>{email.email}</td>
                          <td>{email.phone}</td>
                          <td>{email.message}</td>
                          <td>{new Date(email.sentAt).toLocaleString()}</td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="5">No recent clients found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
