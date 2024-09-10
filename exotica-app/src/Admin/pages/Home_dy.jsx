import React, { useEffect, useRef, useState } from 'react';
import Sidebar from "../components/Sidebar";
import ListIcon from '@mui/icons-material/List';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
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

    const [service, setService] = useState({ text: '' });
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



    const [cards, setCards] = useState([]);
    const [newCard, setNewCard] = useState({

        linktext: '',
        linkurl: '',
        image: null,
        arrowimage: null,
    });

    const [currentCardId, setCurrentCardId] = useState(null);

    const [chooseData, setChooseData] = useState({
        heading: '',
        image: '',
        slides: [],
    });
    const [newSlide, setNewSlide] = useState('');
    const [chooseList, setChooseList] = useState([]);

    const [isEditingSlide, setIsEditingSlide] = useState(false);
    const [editSlideIndex, setEditSlideIndex] = useState(null);
    const [editedSlide, setEditedSlide] = useState('');



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

            setService({ text: '' });
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
            formData.append('image', file);
        }

        const url = isEditing
            ? `http://localhost:5000/api/rating/${editRatingId}`
            : 'http://localhost:5000/api/rating';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                body: formData,
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

    const saveFuture = async () => {
        const formData = new FormData();
        formData.append('text', future.text);
        formData.append('btntext', future.btntext);
        formData.append('btnurl', future.btnurl);
        if (imageFile) formData.append('image', imageFile);
        if (mainImageFile) formData.append('mainimage', mainImageFile);

        try {
            if (isEditing) {

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


    // cards section 


    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/cards');
            const data = await response.json();
            setCards(data);
        } catch (err) {
            console.error('Error fetching cards:', err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCard({
            ...newCard,
            [name]: value,
        });
    };

    const handleFileChangecards = (e) => {
        const { name } = e.target;
        setNewCard({
            ...newCard,
            [name]: e.target.files[0],
        });
    };

    const saveCard = async () => {
        const formData = new FormData();

        formData.append('linktext', newCard.linktext);
        formData.append('linkurl', newCard.linkurl);
        formData.append('image', newCard.image);
        formData.append('arrowimage', newCard.arrowimage);

        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `http://localhost:5000/api/cards/${currentCardId}` : 'http://localhost:5000/api/cards';

        try {
            await fetch(url, {
                method,
                body: formData,
            });
            fetchCards();
            resetForm();
        } catch (err) {
            console.error('Error saving card:', err);
        }
    };

    const editCard = (id) => {
        const card = cards.find((c) => c._id === id);
        setNewCard({

            linktext: card.linktext,
            linkurl: card.linkurl,
            image: null,
            arrowimage: null,
        });
        setIsEditing(true);
        setCurrentCardId(id);
    };

    const deleteCard = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/cards/${id}`, {
                method: 'DELETE',
            });
            fetchCards();
        } catch (err) {
            console.error('Error deleting card:', err);
        }
    };

    const resetForm = () => {
        setNewCard({

            linktext: '',
            linkurl: '',
            image: null,
            arrowimage: null,
        });
        setIsEditing(false);
        setCurrentCardId(null);
    };

    // choose section

    useEffect(() => {
        fetchChooseData();
    }, []);

    const handleChooseChange = (e) => {
        setChooseData({
            ...chooseData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        setChooseData({
            ...chooseData,
            image: e.target.files[0], // Image file
        });
    };

    const handleSlideChange = (e) => {
        setNewSlide(e.target.value);
    };

    const addSlide = () => {
        setChooseData({
            ...chooseData,
            slides: [...chooseData.slides, newSlide],
        });
        setNewSlide('');
    };

    const removeSlide = (index) => {
        const updatedSlides = chooseData.slides.filter((_, i) => i !== index);
        setChooseData({
            ...chooseData,
            slides: updatedSlides,
        });
    };

    // Handle editing a slide
    const editSlide = (index) => {
        setEditSlideIndex(index);
        setEditedSlide(chooseData.slides[index]);
        setIsEditingSlide(true);
    };

    const saveEditedSlide = () => {
        const updatedSlides = [...chooseData.slides];
        updatedSlides[editSlideIndex] = editedSlide;

        setChooseData({
            ...chooseData,
            slides: updatedSlides,
        });

        setIsEditingSlide(false);
        setEditSlideIndex(null);
        setEditedSlide('');
    };

    const fetchChooseData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/choose');
            const data = await response.json();
            setChooseList(data);
        } catch (error) {
            console.error('Failed to fetch choose data', error);
        }
    };

    const saveChoose = async () => {
        const formData = new FormData();
        formData.append('heading', chooseData.heading);
        formData.append('image', chooseData.image);
        formData.append('slides', JSON.stringify(chooseData.slides)); // Convert array to JSON

        try {
            const requestOptions = {
                method: isEditing ? 'PUT' : 'POST',
                body: formData,
            };

            const response = await fetch(
                isEditing ? `http://localhost:5000/api/choose/${editId}` : 'http://localhost:5000/api/choose',
                requestOptions
            );

            if (response.ok) {
                fetchChooseData();
                chooseresetForm();
            } else {
                console.error('Failed to save choose data');
            }
        } catch (error) {
            console.error('Failed to save choose data', error);
        }
    };

    const editChoose = (id) => {
        const selectedChoose = chooseList.find((item) => item._id === id);
        setChooseData({
            heading: selectedChoose.heading,
            image: '',
            slides: selectedChoose.slides,
        });
        setIsEditing(true);
        setEditId(id);
    };

    const removeChoose = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/choose/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchChooseData();
            } else {
                console.error('Failed to delete choose item');
            }
        } catch (error) {
            console.error('Failed to delete choose item', error);
        }
    };

    const chooseresetForm = () => {
        setChooseData({
            heading: '',
            image: '',
            slides: [],
        });
        setIsEditing(false);
        setEditId(null);
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
                <div className='section-main'>
                    <section className='banner-section'>
                        <div className='dy_heading'>
                            <h2>Banner Section</h2>
                        </div>
                        <div className='single_field'>
                            <input
                                type='text'
                                name='heading'
                                value={banner.heading}
                                onChange={handleBannerChange}
                                placeholder="Heading"
                            />
                        </div>
                        <div className='two_field flex'>
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
                        </div>
                        <div className='dy_btn'>
                            <button onClick={saveBanner}>{isEditingBanner ? 'Update Banner' : 'Save Banner'}</button>
                        </div>
                    </section>


                    <section className='banner-list'>
                        <div className='dy_heading'>
                            <h2>Existing Banners</h2>
                        </div>
                        <table className='dy_table'>
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
                                            <div className='action flex'>
                                                <button onClick={() => editBanner(banner._id)}><EditOutlinedIcon /></button>
                                                <button onClick={() => removeBanner(banner._id)}><DeleteForeverOutlinedIcon /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>


                {/* Counter Section */}
                <div className='section-main'>
                    <section className='counter-section'>
                        <div className='dy_heading'>
                            <h2>Counter Section</h2>
                        </div>
                        <div className='two_field flex'>
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
                        </div>
                        <div className='dy_btn'>
                            <button onClick={saveCounter}>{isEditingCounter ? 'Update Counter' : 'Save Counter'}</button>
                        </div>
                    </section>

                    <section className='counter-list'>
                        <div className='dy_heading'>
                            <h2>Existing Counters</h2>
                        </div>

                        <table className='dy_table'>
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
                                            <div className='action flex'>
                                                <button onClick={() => editCounter(counter._id)}><EditOutlinedIcon /></button>
                                                <button onClick={() => removeCounter(counter._id)}><DeleteForeverOutlinedIcon /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>
                {/* services section */}

                <div className='section-main'>
                    <section className='service-section'>
                        <div className='dy_heading'>
                            <h2>Service Section</h2>
                        </div>

                        <input
                            type='text'
                            name='text'
                            value={service.text}
                            onChange={handleServiceChange}
                            placeholder="Type Service Card HTML"
                        />
                        <div className='dy_btn'>
                            <button onClick={saveService}>{isEditingService ? 'Update Service' : 'Save Service Card'}</button>
                        </div>
                    </section>

                    <section className='service-list'>
                        <div className='dy_heading'>
                            <h2>Existing Services</h2>
                        </div>
                        <table className='dy_table'>
                            <thead>
                                <tr>

                                    <th>Text</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((service) => (
                                    <tr key={service._id}>

                                        <td>{service.text}</td>
                                        <td>
                                            <div className='action flex'>
                                                <button onClick={() => editService(service._id)}><EditOutlinedIcon /></button>
                                                <button onClick={() => removeService(service._id)}><DeleteForeverOutlinedIcon /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>

                {/* Rating section */}
                <div className='section-main'>

                    <section className='ratin-section'>
                        <div className='dy_heading'>
                            <h2>{isEditing ? 'Edit Rating' : 'Rating Section'}</h2>
                        </div>
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
                                <div className='rating_social_field flex '>
                                    <input
                                        type="text"
                                        name="label"
                                        value={socialItem.label}
                                        onChange={(e) => handleSocialChange(index, e)}
                                        placeholder="Social Label"
                                    />
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>
                        ))}
                        <div className='rating_btn'>
                            <button onClick={addSocialField}>Add Social</button>
                            <button onClick={saveRating}>{isEditing ? 'Update Rating' : 'Save Rating'}</button>
                        </div>
                    </section>


                    <section className='rating_list'>
                        <div className='dy_heading'>
                            <h2>Existing Ratings</h2>
                        </div>
                        <table className="dy_table">
                            <thead>
                                <tr>
                                    <th>Heading</th>
                                    <th>Text</th>
                                    <th>Social Media</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ratings.map((rating) => (
                                    <tr key={rating._id}>
                                        <td>{rating.heading}</td>
                                        <td>{rating.text}</td>
                                        <td>
                                            <ul>
                                                {rating.social.map((social, index) => (
                                                    <li key={index}>
                                                        {social.label}: <img src={social.imageurl} alt={social.label} style={{ width: '20px', height: '20px' }} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td>
                                            <button className="rating_edit" onClick={() => editRating(rating._id)}>Edit</button>
                                            <button className="rating_remove" onClick={() => removeRating(rating._id)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>


                    </section>
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
                                    <td><img src={item.image} /></td>
                                    <td><img src={item.mainimage} /></td>
                                    <td>
                                        <button onClick={() => editFuture(item._id)}>Edit</button>
                                        <button onClick={() => deleteFuture(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* card section */}
                <div>
                    <section className="card-section">
                        <h2>{isEditing ? 'Edit Card' : 'Add New Card'}</h2>

                        <input
                            type="text"
                            name="linktext"
                            value={newCard.linktext}
                            onChange={handleInputChange}
                            placeholder="Link Text"
                        />
                        <input
                            type="text"
                            name="linkurl"
                            value={newCard.linkurl}
                            onChange={handleInputChange}
                            placeholder="Link URL"
                        />
                        <input
                            type="file"
                            name="image"
                            onChange={handleFileChangecards}
                        />
                        <input
                            type="file"
                            name="arrowimage"
                            onChange={handleFileChangecards}
                        />
                        <button onClick={saveCard}>
                            {isEditing ? 'Update Card' : 'Save Card'}
                        </button>
                    </section>

                    <section className="cards-list">
                        <h2>Existing Cards</h2>
                        <table className='table'>
                            <thead>
                                <tr>

                                    <th>Link Text</th>

                                    <th>Main Image</th>
                                    <th>Arrow</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody >
                                {cards.map((card) => (
                                    <tr key={card._id}>

                                        <td>{card.linktext}</td>
                                        <td className='cardimage'><img src={card.image} /></td>
                                        <td><img src={card.arrowimage} /></td>
                                        <td>
                                            <button onClick={() => editCard(card._id)}>Edit</button>
                                            <button onClick={() => deleteCard(card._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>

                {/* choose section */}
                <div>
                    <section className="choose-section">
                        <h2>Choose Section</h2>
                        <input
                            type="text"
                            name="heading"
                            value={chooseData.heading}
                            onChange={handleChooseChange}
                            placeholder="Heading"
                        />
                        <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                        />

                        <div>
                            <input
                                type="text"
                                value={newSlide}
                                onChange={handleSlideChange}
                                placeholder="Add Slide"
                            />
                            <button onClick={addSlide}>Add Slide</button>
                        </div>

                        <div>
                            <h4>Slides:</h4>
                            {chooseData.slides.map((slide, index) => (
                                <div key={index}>
                                    {isEditingSlide && editSlideIndex === index ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={editedSlide}
                                                onChange={(e) => setEditedSlide(e.target.value)}
                                            />
                                            <button onClick={saveEditedSlide}>Save</button>
                                        </div>
                                    ) : (
                                        <>
                                            <span>{slide}</span>
                                            <button onClick={() => editSlide(index)}>Edit</button>
                                            <button onClick={() => removeSlide(index)}>Remove</button>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button onClick={saveChoose}>
                            {isEditing ? 'Update Choose' : 'Save Choose'}
                        </button>
                    </section>

                    <section className="choose-list">
                        <h2>Existing Choose Sections</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Heading</th>
                                    <th>Image</th>
                                    <th>Slides</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chooseList.map((chooseItem) => (
                                    <tr key={chooseItem._id}>
                                        <td>{chooseItem.heading}</td>
                                        <td>
                                            <img src={`/${chooseItem.image}`} alt="Choose" width="50" />
                                        </td>
                                        <td>
                                            {chooseItem.slides.map((slide, i) => (
                                                <span key={i}>{slide}</span>
                                            ))}
                                        </td>
                                        <td>
                                            <button onClick={() => editChoose(chooseItem._id)}>Edit</button>
                                            <button onClick={() => removeChoose(chooseItem._id)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>


            </div>
        </div >
    );
}

export default Home_dynamic;
