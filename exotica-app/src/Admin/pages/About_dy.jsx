import React, { useEffect, useRef, useState } from 'react';
import Sidebar from "../components/Sidebar";
import ListIcon from '@mui/icons-material/List';
import $ from 'jquery';

function Home_dynamic() {
    const navigationRef = useRef(null);
    const mainRef = useRef(null);
    const toggleRef = useRef(null);

    const [heroData, setHeroData] = useState({
        heading: '',
        subheading: '',
        buttonText: '',
        image: '',
    });

    const [imageFiles, setImageFiles] = useState(new Array(7).fill(null));
    const [removedImages, setRemovedImages] = useState([]);
    const [serviceForm, setServiceForm] = useState({
        title: '',
        highlight: '',
        description: '',
    });

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

    useEffect(() => {
        async function fetchHeroData() {
            try {
                const response = await fetch('http://localhost:5000/api/hero');
                const data = await response.json();

                setHeroData({
                    heading: data.heading || '',
                    subheading: data.subheading || '',
                    buttonText: data.buttonText || '',
                    image: data.image || '',
                });

                if (data.images) {
                    const initialImages = new Array(7).fill(null);
                    data.images.forEach((url, index) => {
                        if (index < 7) initialImages[index] = url;
                    });
                    setImageFiles(initialImages);
                }
            } catch (error) {
                console.error('Error fetching hero data:', error);
            }
        }
        fetchHeroData();
    }, []);

    const handleHeroChange = (e) => {
        setHeroData({ ...heroData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (index, e) => {
        const newFiles = [...imageFiles];
        newFiles[index] = e.target.files[0];
        setImageFiles(newFiles);
        e.target.value = ''; 
    };

    const handleRemoveImage = (index) => {
        const newFiles = [...imageFiles];
        if (typeof newFiles[index] === 'string') {
            setRemovedImages([...removedImages, newFiles[index]]);
        }
        newFiles[index] = null;
        setImageFiles(newFiles);
    };

    const handleHeroSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('heading', heroData.heading);
        formData.append('subheading', heroData.subheading);
        formData.append('buttonText', heroData.buttonText);
        formData.append('image', heroData.image);

        imageFiles.forEach((file) => {
            if (file) {
                if (typeof file === 'string') {
                    formData.append('images', file);
                } else {
                    formData.append('images', file);
                }
            }
        });

        removedImages.forEach((image) => {
            formData.append('removedImages', image);
        });

        try {
            const response = await fetch('http://localhost:5000/api/hero', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                alert('Hero data saved successfully!');
                setHeroData({
                    heading: data.heading,
                    subheading: data.subheading,
                    buttonText: data.buttonText,
                    image: data.image,
                });
                setImageFiles(data.images.slice(0, 7));
                setRemovedImages([]);
            } else {
                console.error('Failed to save hero data');
            }
        } catch (error) {
            console.error('Error posting hero data:', error);
        }
    };

    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({
        title: '',
        heading: '',
        description: '',
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/services');
            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const handleChange = (e) => {
        setNewService({ ...newService, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newService),
            });

            if (response.ok) {
                fetchServices();
                setNewService({ title: '', heading: '', description: '' });
            } else {
                console.error('Failed to add service');
            }
        } catch (error) {
            console.error('Error adding service:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/services/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchServices();
            } else {
                console.error('Failed to delete service');
            }
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="main" ref={mainRef}>
                <div className="topbar">
                    <div className="toggle" ref={toggleRef}>
                        <ListIcon />
                    </div>

                    <div className="search">
                        <label>
                            <input type="text" placeholder="Search here" />
                            <ion-icon name="search-outline"></ion-icon>
                        </label>
                    </div>

                    <div className="user">
                        <img src="techhnology.png" alt="User" />
                    </div>
                </div>
                <form onSubmit={handleHeroSubmit}>
                    <input
                        type="text"
                        name="heading"
                        value={heroData.heading}
                        onChange={handleHeroChange}
                        placeholder="Heading"
                    />
                    <input
                        type="text"
                        name="subheading"
                        value={heroData.subheading}
                        onChange={handleHeroChange}
                        placeholder="Subheading"
                    />
                    <input
                        type="text"
                        name="buttonText"
                        value={heroData.buttonText}
                        onChange={handleHeroChange}
                        placeholder="Button Text"
                    />
                    <input
                        type="text"
                        name="image"
                        value={heroData.image}
                        onChange={handleHeroChange}
                        placeholder="Image URL"
                    />
                    <div>
                        {imageFiles.map((file, index) => (
                            <div key={index} style={{ marginTop: '10px' }}>
                                {file && (
                                    <img
                                        src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                                        alt={`Image ${index}`}
                                        width="100"
                                    />
                                )}
                                <input
                                    type="file"
                                    onChange={(e) => handleImageChange(index, e)}
                                />
                                {file && (
                                    <button type="button" onClick={() => handleRemoveImage(index)}>Remove Image</button>
                                )}
                            </div>
                        ))}
                    </div>
                    <button type="submit">Save</button>
                </form>
                <div>
                    <h2>Service Manager</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            value={newService.title}
                            onChange={handleChange}
                            placeholder="Title"
                            required
                        />
                        <input
                            type="text"
                            name="heading"
                            value={newService.heading}
                            onChange={handleChange}
                            placeholder="Heading"
                            required
                        />
                        <textarea
                            name="description"
                            value={newService.description}
                            onChange={handleChange}
                            placeholder="Description"
                            required
                        ></textarea>
                        <button type="submit">Add Service</button>
                    </form>
                    <ul>
                        {services.map((service) => (
                            <li key={service._id}>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <button onClick={() => handleDelete(service._id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home_dynamic;
