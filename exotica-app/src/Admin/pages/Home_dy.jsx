import React, { useEffect, useRef, useState } from 'react';
import Sidebar from "../components/Sidebar";
import ListIcon from '@mui/icons-material/List';
import $ from 'jquery';


function Home_dynamic() {
    const navigationRef = useRef(null);
    const mainRef = useRef(null);
    const toggleRef = useRef(null);

    const [banner, setBanner] = useState({ heading: '', buttonText: '', buttonUrl: '' });
    const [banners, setBanners] = useState([]);
    const [isEditingBanner, setIsEditingBanner] = useState(false);
    const [editBannerId, setEditBannerId] = useState(null);

    const [counter, setCounter] = useState({ label: '', digit: '' });
    const [counters, setCounters] = useState([]);
    const [isEditingCounter, setIsEditingCounter] = useState(false);
    const [editCounterId, setEditCounterId] = useState(null);

    const [service, setService] = useState({ label: '', heading: '', text: '' });
    const [services, setServices] = useState([]);
    const [isEditingService, setIsEditingService] = useState(false);
    const [editServiceId, setEditServiceId] = useState(null);

    const [rating, setRating] = useState({ heading: '', social: [{ label: '', imageurl: '' }], text: '' });
    const [file, setFile] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editRatingId, setEditRatingId] = useState(null);

    const [expertise, setExpertise] = useState({ heading: '', text: '' });
    const [expertises, setExpertises] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [future, setFuture] = useState({
        text: '',
        btntext: '',
        btnurl: '',
        image: '',
        mainimage: ''
    });
    const [futures, setFutures] = useState([]);
    const [editId, setEditId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [mainImageFile, setMainImageFile] = useState(null);



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

    // Banner section
    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/banner');
            const data = await response.json();
            setBanners(data);
        } catch (err) {
            console.error('Error fetching banners:', err);
        }
    };

    const handleBannerChange = (e) => {
        setBanner({ ...banner, [e.target.name]: e.target.value });
    };

    const saveBanner = async () => {
        const url = isEditingBanner ? `http://localhost:5000/api/banner/${editBannerId}` : 'http://localhost:5000/api/banner';
        const method = isEditingBanner ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(banner),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setBanner({ heading: '', buttonText: '', buttonUrl: '' });
            setIsEditingBanner(false);
            setEditBannerId(null);
            fetchBanners();
        } catch (err) {
            console.error('Error saving banner:', err);
        }
    };

    const editBanner = (id) => {
        const bannerToEdit = banners.find(banner => banner._id === id);
        setBanner(bannerToEdit);
        setIsEditingBanner(true);
        setEditBannerId(id);
    };

    const removeBanner = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/banner/${id}`, {
                method: 'DELETE',
            });
            fetchBanners();
        } catch (err) {
            console.error('Error removing banner:', err);
        }
    };

    // Counter section
    useEffect(() => {
        fetchCounters();
    }, []);

    const fetchCounters = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/counters');
            const data = await response.json();
            setCounters(data);
        } catch (err) {
            console.error('Error fetching counters:', err);
        }
    };

    const handleCounterChange = (e) => {
        setCounter({ ...counter, [e.target.name]: e.target.value });
    };

    const saveCounter = async () => {
        const url = isEditingCounter ? `http://localhost:5000/api/counters/${editCounterId}` : 'http://localhost:5000/api/counters';
        const method = isEditingCounter ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(counter),
            });

            if (!response.ok) {
                throw new Error('Network response was not okkk');
            }

            setCounter({ label: '', digit: '' });
            setIsEditingCounter(false);
            setEditCounterId(null);
            fetchCounters();
        } catch (err) {
            console.error('Error saving counter:', err);
        }
    };

    const editCounter = (id) => {
        const counterToEdit = counters.find(counter => counter._id === id);
        setCounter(counterToEdit);
        setIsEditingCounter(true);
        setEditCounterId(id);
    };

    const removeCounter = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/counters/${id}`, {
                method: 'DELETE',
            });
            fetchCounters();
        } catch (err) {
            console.error('Error removing counter haii:', err);
        }
    };

    //service section 
    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/service');
            const data = await response.json();
            setServices(data);
        } catch (err) {
            console.error('Error fetching services:', err);
        }
    };

    const handleServiceChange = (e) => {
        setService({ ...service, [e.target.name]: e.target.value });
    };

    const saveService = async () => {
        const url = isEditingService
            ? `http://localhost:5000/api/service/${editServiceId}`
            : 'http://localhost:5000/api/service';
        const method = isEditingService ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(service),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setService({ label: '', heading: '', text: '' });
            setIsEditingService(false);
            setEditServiceId(null);
            fetchServices(); // Call fetchServices to refresh the list
        } catch (err) {
            console.error('Error saving service:', err);
        }
    };

    const editService = (id) => {
        const serviceToEdit = services.find(service => service._id === id);
        setService(serviceToEdit);
        setIsEditingService(true);
        setEditServiceId(id);
    };

    const removeService = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/service/${id}`, {
                method: 'DELETE',
            });
            fetchServices(); // Refresh the list after deletion
        } catch (err) {
            console.error('Error removing service:', err);
        }
    };

    // Rating section

    useEffect(() => {
        fetchRatings();
    }, []);


    const fetchRatings = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/rating');
            const data = await response.json();
            setRatings(data);
        } catch (err) {
            console.error('Error fetching ratings:', err);
        }
    };


    const handleRatingChange = (e) => {
        const { name, value } = e.target;
        setRating({ ...rating, [name]: value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };


    const handleSocialChange = (index, e) => {
        const { name, value } = e.target;
        const updatedSocial = [...rating.social];
        updatedSocial[index][name] = value;
        setRating({ ...rating, social: updatedSocial });
    };


    const addSocialField = () => {
        setRating({ ...rating, social: [...rating.social, { label: '', imageurl: '' }] });
    };

    const removeSocialField = (index) => {
        const updatedSocial = rating.social.filter((_, i) => i !== index);
        setRating({ ...rating, social: updatedSocial });
    };


    const saveRating = async () => {
        const formData = new FormData();
        formData.append('heading', rating.heading);
        formData.append('text', rating.text);

        rating.social.forEach((socialItem, index) => {
            formData.append(`social[${index}][label]`, socialItem.label);
            formData.append(`social[${index}][imageurl]`, socialItem.imageurl);
        });

        if (file) {
            formData.append('image', file); // Append the file to formData
        }

        const url = isEditing
            ? `http://localhost:5000/api/rating/${editRatingId}`
            : 'http://localhost:5000/api/rating';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                body: formData, // Send formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setRating({ heading: '', social: [{ label: '', imageurl: '' }], text: '' });
            setFile(null);
            setIsEditing(false);
            setEditRatingId(null);
            fetchRatings();
        } catch (err) {
            console.error('Error saving rating:', err);
        }
    };


    const editRating = (id) => {
        const ratingToEdit = ratings.find(r => r._id === id);
        setRating(ratingToEdit);
        setIsEditing(true);
        setEditRatingId(id);
    };


    const removeRating = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/rating/${id}`, { method: 'DELETE' });
            fetchRatings();
        } catch (err) {
            console.error('Error removing rating:', err);
        }
    };

    // expertise section

    useEffect(() => {
        fetchExpertises();
    }, []);

    // Function to fetch all expertises
    const fetchExpertises = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/expertise');
            const data = await response.json();
            setExpertises(data);
        } catch (err) {
            console.error('Error fetching expertises:', err);
        }
    };

    // Handle input change for expertise form
    const handleExpertiseChange = (e) => {
        const { name, value } = e.target;
        setExpertise({
            ...expertise,
            [name]: value,
        });
    };

    // Save or update expertise
    const saveExpertise = async () => {
        const url = isEditing
            ? `http://localhost:5000/api/expertise/${editingId}`
            : 'http://localhost:5000/api/expertise';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expertise),
            });

            const data = await response.json();
            if (isEditing) {
                setExpertises(expertises.map((item) => (item._id === editingId ? data : item)));
            } else {
                setExpertises([...expertises, data]);
            }

            // Reset form and state after submission
            setExpertise({ heading: '', text: '' });
            setIsEditing(false);
            setEditingId(null);
        } catch (err) {
            console.error('Error saving expertise:', err);
        }
    };

    // Handle edit button click
    const editExpertise = (id) => {
        const expertiseToEdit = expertises.find((item) => item._id === id);
        setExpertise({ heading: expertiseToEdit.heading, text: expertiseToEdit.text });
        setIsEditing(true);
        setEditingId(id);
    };

    // Handle delete button click
    const removeExpertise = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/expertise/${id}`, {
                method: 'DELETE',
            });
            setExpertises(expertises.filter((expertise) => expertise._id !== id));
        } catch (err) {
            console.error('Error deleting expertise:', err);
        }
    };

    // Future Section
    // Fetch all future sections
    useEffect(() => {
        fetchFutures();
    }, []);

    const fetchFutures = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/future');
            const data = await response.json();
            setFutures(data);
        } catch (err) {
            console.error('Error fetching futures:', err);
        }
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFuture({ ...future, [name]: value });
    };

    // Handle file change for image upload
    const handleFileChangee = (e) => {
        if (e.target.name === 'image') {
            setImageFile(e.target.files[0]);
        } else if (e.target.name === 'mainimage') {
            setMainImageFile(e.target.files[0]);
        }
    };

    // Save or Update Future
    const saveFuture = async () => {
        const formData = new FormData();
        formData.append('text', future.text);
        formData.append('btntext', future.btntext);
        formData.append('btnurl', future.btnurl);
        if (imageFile) formData.append('image', imageFile);
        if (mainImageFile) formData.append('mainimage', mainImageFile);

        try {
            if (isEditing) {
                // Update existing future
                await fetch(`http://localhost:5000/api/future/${editId}`, {
                    method: 'PUT',
                    body: formData
                });
                setIsEditing(false);
                setEditId(null);
            } else {
                // Create new future
                await fetch('http://localhost:5000/api/future', {
                    method: 'POST',
                    body: formData
                });
            }
            setFuture({ text: '', btntext: '', btnurl: '', image: '', mainimage: '' });
            setImageFile(null);
            setMainImageFile(null);
            fetchFutures();
        } catch (err) {
            console.error('Error saving future:', err);
        }
    };

    // Edit future section
    const editFuture = (id) => {
        const selectedFuture = futures.find((item) => item._id === id);
        setFuture(selectedFuture);
        setIsEditing(true);
        setEditId(id);
    };

    // Delete future section
    const deleteFuture = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/future/${id}`, {
                method: 'DELETE'
            });
            fetchFutures();
        } catch (err) {
            console.error('Error deleting future:', err);
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

                {/* Banner Section */}
                <div className='flexx'>
                    <section className='banner-section'>
                        <h2>Banner Section</h2>
                        <input
                            type='text'
                            name='heading'
                            value={banner.heading}
                            onChange={handleBannerChange}
                            placeholder="Heading"
                        />
                        <input
                            type='text'
                            name='buttonText'
                            value={banner.buttonText}
                            onChange={handleBannerChange}
                            placeholder="Button Text"
                        />
                        <input
                            type='text'
                            name='buttonUrl'
                            value={banner.buttonUrl}
                            onChange={handleBannerChange}
                            placeholder="Button URL"
                        />
                        <button onClick={saveBanner}>{isEditingBanner ? 'Update Banner' : 'Save Banner'}</button>
                    </section>

                    <section className='banner-list'>
                        <h2>Existing Banners</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Heading</th>
                                    <th>Button Text</th>
                                    <th>Button URL</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {banners.map((banner) => (
                                    <tr key={banner._id}>
                                        <td>{banner.heading}</td>
                                        <td>{banner.buttonText}</td>
                                        <td>{banner.buttonUrl}</td>
                                        <td>
                                            <button onClick={() => editBanner(banner._id)}>Edit</button>
                                            <button onClick={() => removeBanner(banner._id)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>
                {/* Counter Section */}
                <section className='counter-section'>
                    <h2>Counter Section</h2>
                    <input
                        type='text'
                        name='label'
                        value={counter.label}
                        onChange={handleCounterChange}
                        placeholder="Label"
                    />
                    <input
                        type='number'
                        name='digit'
                        value={counter.digit}
                        onChange={handleCounterChange}
                        placeholder="Digit"
                    />
                    <button onClick={saveCounter}>{isEditingCounter ? 'Update Counter' : 'Save Counter'}</button>
                </section>

                <section className='counter-list'>
                    <h2>Existing Counters</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Label</th>
                                <th>Digit</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {counters.map((counter) => (
                                <tr key={counter._id}>
                                    <td>{counter.label}</td>
                                    <td>{counter.digit}</td>
                                    <td>
                                        <button onClick={() => editCounter(counter._id)}>Edit</button>
                                        <button onClick={() => removeCounter(counter._id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* services section */}

                <div className='flexx'>
                    <section className='service-section'>
                        <h2>Service Section</h2>
                        <input
                            type='text'
                            name='label'
                            value={service.label}
                            onChange={handleServiceChange}
                            placeholder="Label"
                        />
                        <input
                            type='text'
                            name='heading'
                            value={service.heading}
                            onChange={handleServiceChange}
                            placeholder="Service heading"
                        />
                        <input
                            type='text'
                            name='text'
                            value={service.text}
                            onChange={handleServiceChange}
                            placeholder="Text"
                        />
                        <button onClick={saveService}>{isEditingService ? 'Update Service' : 'Save Service'}</button>
                    </section>

                    <section className='service-list'>
                        <h2>Existing Services</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Label</th>
                                    <th>Heading</th>
                                    <th>Text</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((service) => (
                                    <tr key={service._id}>
                                        <td>{service.label}</td>
                                        <td>{service.heading}</td>
                                        <td>{service.text}</td>
                                        <td>
                                            <button onClick={() => editService(service._id)}>Edit</button>
                                            <button onClick={() => removeService(service._id)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>

                {/* Rating section */}
                <div>
                    <h2>{isEditing ? 'Edit Rating' : 'Add New Rating'}</h2>
                    <input
                        type="text"
                        name="heading"
                        value={rating.heading}
                        onChange={handleRatingChange}
                        placeholder="Heading"
                    />
                    <input
                        type="text"
                        name="text"
                        value={rating.text}
                        onChange={handleRatingChange}
                        placeholder="Text"
                    />

                    <h3>Social Media Links</h3>
                    {rating.social.map((socialItem, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name="label"
                                value={socialItem.label}
                                onChange={(e) => handleSocialChange(index, e)}
                                placeholder="Social Label"
                            />
                            <input
                                type="file"
                                onChange={handleFileChange} // File upload
                            />
                        </div>
                    ))}

                    <button onClick={addSocialField}>Add Social</button>
                    <button onClick={saveRating}>{isEditing ? 'Update Rating' : 'Save Rating'}</button>

                    <h2>Existing Ratings</h2>
                    <ul>
                        {ratings.map((rating) => (
                            <li key={rating._id}>
                                <h3>{rating.heading}</h3>
                                <p>{rating.text}</p>
                                <ul>
                                    {rating.social.map((social, index) => (
                                        <li key={index}>
                                            {social.label}: <img src={social.imageurl} alt={social.label} />
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={() => editRating(rating._id)}>Edit</button>
                                <button onClick={() => removeRating(rating._id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* expertise section */}
                <div>
                    <section className="expertise-section">
                        <h2>Expertise Section</h2>
                        <input
                            type="text"
                            name="heading"
                            value={expertise.heading}
                            onChange={handleExpertiseChange}
                            placeholder="Heading"
                        />
                        <textarea
                            name="text"
                            value={expertise.text}
                            onChange={handleExpertiseChange}
                            placeholder="Text"
                        />
                        <button onClick={saveExpertise}>
                            {isEditing ? 'Update Expertise' : 'Save Expertise'}
                        </button>
                    </section>

                    <section className="expertise-list">
                        <h2>Existing Expertise</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Heading</th>
                                    <th>Text</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expertises.map((expertise) => (
                                    <tr key={expertise._id}>
                                        <td>{expertise.heading}</td>
                                        <td>{expertise.text}</td>
                                        <td>
                                            <button onClick={() => editExpertise(expertise._id)}>Edit</button>
                                            <button onClick={() => removeExpertise(expertise._id)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>

                {/* future section */}
                <div>
            <h2>Manage Future Section</h2>

            <div className='future-section'>
                <input
                    type='text'
                    name='text'
                    value={future.text}
                    onChange={handleChange}
                    placeholder='Text'
                />
                <input
                    type='text'
                    name='btntext'
                    value={future.btntext}
                    onChange={handleChange}
                    placeholder='Button Text'
                />
                <input
                    type='text'
                    name='btnurl'
                    value={future.btnurl}
                    onChange={handleChange}
                    placeholder='Button URL'
                />
                <input
                    type='file'
                    name='image'
                    onChange={handleFileChangee}
                />
                <input
                    type='file'
                    name='mainimage'
                    onChange={handleFileChangee}
                />
                <button onClick={saveFuture}>{isEditing ? 'Update Future' : 'Save Future'}</button>
            </div>

            <h3>Existing Future Sections</h3>
            <table>
                <thead>
                    <tr>
                        <th>Text</th>
                        <th>Button Text</th>
                        <th>Button URL</th>
                        <th>Image</th>
                        <th>Main Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {futures.map((item) => (
                        <tr key={item._id}>
                            <td>{item.text}</td>
                            <td>{item.btntext}</td>
                            <td>{item.btnurl}</td>
                            <td>{item.image}</td>
                            <td>{item.mainimage}</td>
                            <td>
                                <button onClick={() => editFuture(item._id)}>Edit</button>
                                <button onClick={() => deleteFuture(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

            </div>
        </div>
    );
}

export default Home_dynamic;
