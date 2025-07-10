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

    if (!isOpen) return null;

    return (
        <div className="sidebar">
            <h3>Campaigns</h3>
            <ul>
                {campaigns.map((campaign, index) => (
                    <li key={index}>{campaign}</li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;