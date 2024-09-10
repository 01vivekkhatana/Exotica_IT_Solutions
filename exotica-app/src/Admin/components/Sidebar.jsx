import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import logo from '../../images/logo.png';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import LooksOutlinedIcon from '@mui/icons-material/LooksOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import CollectionsIcon from '@mui/icons-material/Collections';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Sidebar() {
    const navigationRef = useRef(null);
    const mainRef = useRef(null);
    const toggleRef = useRef(null);

    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/admin');
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleSections = () => {
        setIsOpen(!isOpen);
    };

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
            <div class="navigation" ref={navigationRef}>
                <ul>
                    <li>
                        <Link to="/">
                            <span class="icon">
                                <img src={logo} alt='gg' />
                            </span>

                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/dashboard">
                            <span class="icon">
                                <DashboardOutlinedIcon />
                            </span>
                            <span class="title">Dashboard</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="#">
                            <span class="icon">
                                <PeopleAltOutlinedIcon />
                            </span>
                            <span class="title">Customers</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/header_dynamic">
                            <span class="icon">
                                <CreditCardOutlinedIcon />
                            </span>
                            <span class="title">Header</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/gallery_images">
                            <span class="icon">
                                <CollectionsIcon />
                            </span>
                            <span class="title">Gallery</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <span class="icon">
                                <AutoStoriesOutlinedIcon />
                            </span>
                            <div className="toggle-container">
                                <span className="title">
                                    Pages
                                  <span className='droparrow'> <ArrowDropDownIcon onClick={toggleSections} style={{ cursor: 'pointer' }} /></span> 
                                </span>

                            </div>

                        </Link>

                    </li>
                    {isOpen && (
                        <div className="sections">
                            <Link to="/admin/home_dynamic">  <div className="section-item">Home</div></Link>
                            <Link to=""> <div className="section-item">About</div></Link>
                            <Link to="" > <div className="section-item">Blogs</div></Link>
                        </div>
                    )}
                    <li>
                        <Link to="/admin/footer_dynamic">
                            <span class="icon">
                                <LooksOutlinedIcon />
                            </span>
                            <span class="title">Footer</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="#">
                            <span class="icon">
                                <LockOutlinedIcon />
                            </span>
                            <span class="title">Password</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin" onClick={handleSignOut}>
                            <span class="icon">
                                <ExitToAppOutlinedIcon />
                            </span>
                            <span class="title">Sign Out</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
};
export default Sidebar;