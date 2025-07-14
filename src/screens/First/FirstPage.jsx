import React from 'react';
import './css/FirstPage.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const industries = [
    "Owner",
    "Executive Team",
    "Manager",
    "Employee",
    "Student/intern",
    "Freelancer",
];

function FirstPage() {
    const navigate = useNavigate();
    const { setUserData } = useContext(UserContext);

    const handleSelect = (role) => {
        setUserData((prev) => ({ ...prev, role }));
        navigate('/second')
    }
    return (
        <div className="App">
            <header className="App-header">
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: '33%' }} />
                </div>

                <div className='header-left'>
                    <img src="/g2g-logo.jpeg" alt="Gulp2go Logo" className="logo" />
                </div>
                <h2>Marketing and Advertising</h2>
            </header>
            <main>
                <h1>Nice to meet you!</h1>
                <h3>Which best describes your role?</h3>
                <div className="industry-grid">
                    {industries.map((item, index) => (
                        <button key={index} className="industry-button" onClick={() => handleSelect(item)}>{item}</button>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default FirstPage;