import React, { useEffect, useRef, useState } from 'react';
import Sidebar from "../components/Sidebar";
import ListIcon from '@mui/icons-material/List';
import $ from 'jquery';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function GalleryImages() {
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

    const [gallery, setGallery] = useState([{ images: '' }]);
    const [editMode, setEditMode] = useState({
        gallery: false
    });

    useEffect(() => {
        fetch('http://localhost:5000/api/gallery')
            .then(res => res.json())
            .then(data => {
                setGallery(data.gallery || []);
            })
            .catch(err => console.error('Error fetching gallery data:', err));
    }, []);

    const handleImagesChange = (index, e) => {
        const newGallery = [...gallery];
        newGallery[index].images = e.target.files[0];
        setGallery(newGallery);
    };

    const addGallery = () => {
        setGallery([...gallery, { images: '' }]);
    };

    const removeGallery = (index) => {
        const newGallery = gallery.filter((_, i) => i !== index);
        setGallery(newGallery);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        gallery.forEach((cont, index) => {
            if (cont.images instanceof File) {
                formData.append('images', cont.images);
            }
        });

        formData.append('gallery', JSON.stringify(gallery.map(cont => ({
            ...cont,
            images: cont.images instanceof File ? undefined : cont.images,
        }))));

        fetch('http://localhost:5000/api/gallery', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(() => {
                alert('Gallery updated successfully');
            })
            .catch(err => {
                console.error('Error updating gallery:', err);
                alert('Error updating gallery');
            });
    };

    const toggleEditMode = (section) => {
        setEditMode(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <div className="topbar">
                    <div className="toggle" ref={toggleRef}>
                        <ListIcon />
                    </div>
                    <div className="search">
                        <label>
                            <input type="text" placeholder="Search here" />
                        </label>
                    </div>
                    <div className="user">
                        <img src="techhnology.png" alt="User" />
                    </div>
                </div>
                <h1>Gallery Images</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        {gallery.map((cont, index) => (
                            <div className="flex" key={index}>
                                <img
                                    src={cont.image instanceof File ? URL.createObjectURL(cont.image) : cont.image}
                                    alt={`Gallery image ${index + 1}`}
                                    width="50"
                                />
                                <input
                                    type="file"
                                    onChange={(e) => handleImagesChange(index, e)}
                                    disabled={!editMode.gallery}

                                />
                                {cont.image && (
                                    <div>
                                        <img src={cont.image instanceof File ? URL.createObjectURL(cont.image) : cont.image} alt="Flag Logo" width="50" />
                                    </div>
                                )}
                                <button
                                    type="button"
                                    onClick={() => removeGallery(index)}
                                    disabled={!editMode.gallery}
                                >
                                    <DeleteForeverIcon />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addGallery}
                            disabled={!editMode.gallery}
                        >
                            Add Images
                        </button>
                        <button
                            type="button"
                            onClick={() => toggleEditMode('gallery')}
                        >
                            {editMode.gallery ? 'Cancel Edit' : 'Edit'}
                        </button>
                    </div>
                    <button type="submit" disabled={!editMode.gallery}>Save</button>
                </form>

            </div>

        </div>
    );
}

export default GalleryImages;
