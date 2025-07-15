import React, { useState, useEffect } from 'react';
import './css/Header.css';
import { FaPlus, FaUserCircle, FaBullhorn } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import api from '../../Api';

function Header() {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [name, setName] = useState('')

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        if (storedName) {
            setName(storedName);
        }
    }, [])

    const handleDropdownToggle = () => {
        setShowDropdown(prev => !prev);
    };

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    const handleClick = () => {
        localStorage.clear("token")
        delete api.defaults.headers.common['Authorization'];
        window.location.href = '/';
    }

    return (
        <>
            <header className="dashboard-header">
                <div className="header-left">
                    <img src="/g2g-logo.jpeg" alt="Logo" className="header-logo" />
                    <div className="campaign-icon-wrapper" onClick={toggleSidebar}>
                        {/* <FaBullhorn className="campaign-icon" title="Campaigns" /> */}
                        <div className="campaign-tooltip">Campaigns</div>
                    </div>
                </div>

                <div className="header-center">
                    <input type="text" className="header-search" placeholder="Search campaigns..." />
                    <div className="add-button-wrapper">
                        <button className="add-button" onClick={() => navigate("/addCampaign")}>
                            <FaPlus />
                        </button>
                        <div className="add-tooltip">Create New Campaign</div>
                    </div>
                </div>

                <div className="header-right">
                    <div className="user-dropdown-wrapper" onClick={handleDropdownToggle}>
                        <FaUserCircle size={24} className="user-icon" />
                        {showDropdown && (
                            <div className="user-menu">
                                <p><strong>{name || 'User'}</strong></p>
                                <button
                                    className="user-menu-button"
                                    onClick={() => navigate("/userDashboard")}
                                >
                                    My Campaign
                                </button>
                                <button className="signout-button" onClick={handleClick}>Sign Out</button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* <Sidebar isOpen={sidebarOpen} /> */}
        </>
    );
}

export default Header;