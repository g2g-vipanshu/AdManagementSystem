import React, { useState } from 'react';
import './css/Header.css';
import { FaPlus, FaUserCircle, FaBullhorn } from 'react-icons/fa'; // Campaign icon
import Sidebar from '../Sidebar/Sidebar';

function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleDropdownToggle = () => {
        setShowDropdown(prev => !prev);
    };

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    return (
        <>
            <header className="dashboard-header">
                <div className="header-left">
                    <img src="/g2g-logo.jpeg" alt="Logo" className="header-logo" />
                    <div className="campaign-icon-wrapper" onClick={toggleSidebar}>
                        <FaBullhorn className="campaign-icon" title="Campaigns" />
                        <div className="campaign-tooltip">Campaigns</div>
                    </div>
                </div>

                <div className="header-center">
                    <input type="text" className="header-search" placeholder="Search campaigns..." />
                    <div className="add-button-wrapper">
                        <button className="add-button">
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
                                <p><strong>John Doe</strong></p>
                                <p>Gulp2go</p>
                                <button className="signout-button">Sign Out</button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} />
        </>
    );
}

export default Header;