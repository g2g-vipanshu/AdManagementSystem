import React from 'react';
import './css/Sidebar.css';

function Sidebar({ isOpen }) {
    const campaigns = [
        'Campaign 1',
        'Campaign 2',
        'Campaign 3',
        'Campaign 4',
        'Campaign 5'
    ];

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <h3 className="sidebar-title">Campaigns</h3>
            <ul className="sidebar-list">
                {campaigns.map((campaign, index) => (
                    <li key={index} className="sidebar-item">{campaign}</li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;