import React, { useState } from 'react';
import Swal from 'sweetalert2';


function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle email validation
    if (name === 'email') {
      const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!gmailRegex.test(value)) {
        setErrors(prevErrors => ({ ...prevErrors, email: 'Please enter a valid Gmail address.' }));
      } else {
        setErrors(prevErrors => ({ ...prevErrors, email: '' }));
      }
    }

   

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation check before submitting
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
   
    let isValid = true;
    let newErrors = {};

    if (!gmailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid Gmail address.';
      isValid = false;
    }

  

    setErrors(newErrors);

    if (isValid) {
      try {
        const response = await fetch('http://localhost:5000/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {

          Swal.fire({
            title: 'Success!',
            text: 'Email sent and contact information saved successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          });

          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: '',
          });
        } else {
          const errorData = await response.json();
          setStatus(`Error sending email: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error sending email:', error);
        setStatus('Error sending email');
      }
    }
  };

  return (
    <div className="right_expert">
      <div className="heading-title">
        <h2><span> Let's get acquainted with you.</span></h2>
      </div>
      <div className="home_contactform">
        <form onSubmit={handleSubmit} className="contFrm">
          <div className="inner_contact">
            <div className="field">
              <label className="contact-form__label" htmlFor="firstName">First name</label><br />
              <input
                type="text"
                name="firstName"
                className="contact-form__input"
                placeholder="Kerry"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label className="contact-form__label" htmlFor="lastName">Last name</label><br />
              <input
                type="text"
                name="lastName"
                className="contact-form__input"
                placeholder="Josph"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label className="contact-form__label" htmlFor="email">Email</label><br />
              <input
                type="email"
                name="email"
                className="contact-form__input"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="field">
              <label className="contact-form__label" htmlFor="phone">Phone</label><br />
              <input
                type="tel"
                name="phone"
                className="contact-form__input"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                inputMode="numeric" 
                pattern="[0-9]*" 
                maxLength="10"  
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault(); 
                  }
                }}
              />

            </div>

            <div className="field field_textarea">
              <label className="contact-form__label" htmlFor="message">Message</label><br />
              <textarea
                name="message"
                className="contact-form__text"
                placeholder="Write a few words!"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="submit_btn">
              <input className="contact-form__submit" type="submit" value="Have A Project In Mind" />
            </div>
          </div>
        </form>
        {status && <p>{status}</p>}
      </div>
    </div>
  );
}

export default Contact;
