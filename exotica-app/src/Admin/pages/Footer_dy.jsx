import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import ListIcon from '@mui/icons-material/List';
import Sidebar from "../components/Sidebar";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Footer_dynamic() {
  const navigationRef = useRef(null);
  const mainRef = useRef(null);
  const toggleRef = useRef(null);

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

  const [footerData, setFooterData] = useState({
    mainLinks: [],
    services: [],
    email: '',
    phone: [],
    address: '',
    social: [],
    legal: []
  });

  const [socialIcons, setSocialIcons] = useState([]);
  const [socialIconPreviews, setSocialIconPreviews] = useState([]);
  const [editModes, setEditModes] = useState({
    mainLinks: false,
    services: false,
    phone: false,
    social: false,
    legal: false
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/footer')
      .then(res => res.json())
      .then(data => {
        setFooterData({
          mainLinks: data.mainLinks || [],
          services: data.services || [],
          email: data.email || '',
          phone: data.phone || [],
          address: data.address || '',
          social: data.social || [],
          legal: data.legal || []
        });
        const previews = data.social.map(social => social.iconPath);
        setSocialIconPreviews(previews);
      })
      .catch(err => console.error('Error fetching footer data:', err));
  }, []);

  const handleChange = (e, section, index, field) => {
    const updatedData = { ...footerData };
    if (index !== undefined) {
      updatedData[section][index][field] = e.target.value;
    } else {
      updatedData[section] = e.target.value;
    }
    setFooterData(updatedData);
  };

  const handleAddItem = (section) => {
    const updatedData = { ...footerData };
    if (section === 'phone') {
      updatedData[section].push({ label: '', number: '' });
    } else if (section === 'social') {
      updatedData[section].push({ url: '' });
      setSocialIcons([...socialIcons, null]);
      setSocialIconPreviews([...socialIconPreviews, '']);
    } else if (section === 'legal') {
      updatedData[section].push({ text: '', url: '' });
    } else {
      updatedData[section].push({ text: '', url: '' });
    }
    setFooterData(updatedData);
  };

  const handleRemoveItem = (section, index) => {
    const updatedData = { ...footerData };
    updatedData[section].splice(index, 1);
    setFooterData(updatedData);

    if (section === 'social') {
      const updatedIcons = [...socialIcons];
      updatedIcons.splice(index, 1);
      setSocialIcons(updatedIcons);

      const updatedPreviews = [...socialIconPreviews];
      updatedPreviews.splice(index, 1);
      setSocialIconPreviews(updatedPreviews);
    }
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedIcons = [...socialIcons];
      updatedIcons[index] = file;
      setSocialIcons(updatedIcons);

      const updatedPreviews = [...socialIconPreviews];
      updatedPreviews[index] = URL.createObjectURL(file);
      setSocialIconPreviews(updatedPreviews);
    }
  };

  const handleEditToggle = (section) => {
    setEditModes(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('mainLinks', JSON.stringify(footerData.mainLinks));
    formData.append('services', JSON.stringify(footerData.services));
    formData.append('email', footerData.email);
    formData.append('phone', JSON.stringify(footerData.phone));
    formData.append('address', footerData.address);

    footerData.social.forEach((social, index) => {
      formData.append('socialUrls', social.url);
      if (socialIcons[index]) {
        formData.append('socialIcons', socialIcons[index]);
      }
    });

    formData.append('legal', JSON.stringify(footerData.legal));

    fetch('http://localhost:5000/api/footer', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(() => {
        alert('Footer updated successfully');
      })
      .catch(err => {
        console.error('Error updating footer:', err);
        alert('Error updating footer');
      });
  };

  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="main" ref={mainRef}>
          <div className="topbar">
            <div className="toggle" ref={toggleRef}>
              <ListIcon/>
            </div>

            <div className="search">
              <label>
                <input type="text" placeholder="Search here" />
                <ion-icon name="search-outline"></ion-icon>
              </label>
            </div>

            <div className="user">
              <img src="techhnology.png" alt="" />
            </div>
          </div>
          <div className="header-dashboard">
            <h1>Manage Footer</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <h3>Main Links</h3>
                {footerData.mainLinks.map((link, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      placeholder="Text"
                      value={link.text}
                      onChange={(e) => handleChange(e, 'mainLinks', index, 'text')}
                      disabled={!editModes.mainLinks}
                    />
                    <input
                      type="text"
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) => handleChange(e, 'mainLinks', index, 'url')}
                      disabled={!editModes.mainLinks}
                    />
                    <button type="button" onClick={() => handleRemoveItem('mainLinks', index)}><DeleteForeverIcon/></button>
                  </div>
                ))}
                <button type="button" onClick={() => handleAddItem('mainLinks')}>Add Main Link</button>
                <button type="button" onClick={() => handleEditToggle('mainLinks')}>
                  {editModes.mainLinks ? 'Cancel Edit' : 'Edit'}
                </button>
              </div>

              <div>
                <h3>Services</h3>
                {footerData.services.map((service, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      placeholder="Text"
                      value={service.text}
                      onChange={(e) => handleChange(e, 'services', index, 'text')}
                      disabled={!editModes.services}
                    />
                    <input
                      type="text"
                      placeholder="URL"
                      value={service.url}
                      onChange={(e) => handleChange(e, 'services', index, 'url')}
                      disabled={!editModes.services}
                    />
                    <button type="button" onClick={() => handleRemoveItem('services', index)}><DeleteForeverIcon/></button>
                  </div>
                ))}
                <button type="button" onClick={() => handleAddItem('services')}>Add Service</button>
                <button type="button" onClick={() => handleEditToggle('services')}>
                  {editModes.services ? 'Cancel Edit' : 'Edit'}
                </button>
              </div>

              <div>
                <h3>Email</h3>
                <input
                  type="text"
                  value={footerData.email}
                  onChange={(e) => handleChange(e, 'email')}
                  disabled={!editModes.email}
                />
                <button type="button" onClick={() => handleEditToggle('email')}>
                  {editModes.email ? 'Cancel Edit' : 'Edit'}
                </button>
              </div>

              <div>
                <h3>Phone</h3>
                {footerData.phone.map((phone, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      placeholder="Label"
                      value={phone.label}
                      onChange={(e) => handleChange(e, 'phone', index, 'label')}
                      disabled={!editModes.phone}
                    />
                    <input
                      type="text"
                      placeholder="Number"
                      value={phone.number}
                      onChange={(e) => handleChange(e, 'phone', index, 'number')}
                      disabled={!editModes.phone}
                    />
                    <button type="button" onClick={() => handleRemoveItem('phone', index)}><DeleteForeverIcon/></button>
                  </div>
                ))}
                <button type="button" onClick={() => handleAddItem('phone')}>Add Phone</button>
                <button type="button" onClick={() => handleEditToggle('phone')}>
                  {editModes.phone ? 'Cancel Edit' : 'Edit'}
                </button>
              </div>

              <div>
                <h3>Address</h3>
                <textarea
                  value={footerData.address}
                  onChange={(e) => handleChange(e, 'address')}
                  disabled={!editModes.address}
                />
                <button type="button" onClick={() => handleEditToggle('address')}>
                  {editModes.address ? 'Cancel Edit' : 'Edit'}
                </button>
              </div>

              <div>
                <h3>Social</h3>
                {footerData.social.map((social, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      placeholder="URL"
                      value={social.url}
                      onChange={(e) => handleChange(e, 'social', index, 'url')}
                      disabled={!editModes.social}
                    />
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, index)}
                      disabled={!editModes.social}
                    />
                    {socialIconPreviews[index] && (
                      <div>
                        <img src={socialIconPreviews[index]} alt={`Social Icon ${index}`} width="100" />
                      </div>
                    )}
                    <button type="button" onClick={() => handleRemoveItem('social', index)}><DeleteForeverIcon/></button>
                  </div>
                ))}
                <button type="button" onClick={() => handleAddItem('social')}>Add Social Link</button>
                <button type="button" onClick={() => handleEditToggle('social')}>
                  {editModes.social ? 'Cancel Edit' : 'Edit'}
                </button>
              </div>

              <div>
                <h3>Legal Information</h3>
                {footerData.legal.map((legal, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      placeholder="Text"
                      value={legal.text}
                      onChange={(e) => handleChange(e, 'legal', index, 'text')}
                      disabled={!editModes.legal}
                    />
                    <input
                      type="text"
                      placeholder="URL"
                      value={legal.url}
                      onChange={(e) => handleChange(e, 'legal', index, 'url')}
                      disabled={!editModes.legal}
                    />
                    <button type="button" onClick={() => handleRemoveItem('legal', index)}><DeleteForeverIcon/></button>
                  </div>
                ))}
                <button type="button" onClick={() => handleAddItem('legal')}>Add Legal Information</button>
                <button type="button" onClick={() => handleEditToggle('legal')}>
                  {editModes.legal ? 'Cancel Edit' : 'Edit'}
                </button>
              </div>

              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer_dynamic;
