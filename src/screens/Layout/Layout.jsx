import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './css/Layout.css';

function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="layout-wrapper">
            <Header toggleSidebar={() => setSidebarOpen(prev => !prev)} />
            <div className="main-body">
                <Sidebar isOpen={sidebarOpen} />
                <div className="main-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;