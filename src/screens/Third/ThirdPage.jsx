import React from 'react';
import './css/ThirdPage.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const industries = [
    "Just me",
    "2 to 5",
    "6 to 10",
    "11 to 25",
    "26 to 50",
    "51 to 100",
    "201 to 1,000",
    "1,001 to 10,000",
    "10,001 or more",
];

function ThirdPage() {
    const navigate = useNavigate();
    const { setUserData } = useContext(UserContext);

    const handleClick = (size) => {
        setUserData((prev) => ({ ...prev, companySize: size }));
        navigate('/fourth')
    }
    return (
        <div className="App">
            <header className="App-header">
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: '33%' }} />
                </div>

                <div className='header-left'>
                    <img src="/g2g-logo.jpeg" alt="Gulp2go Logo" className="logo" />
                    <button className="back-button" onClick={() => navigate(-1)}><b>&lt; Back</b></button>
                </div>
            </header>
            <main>
                <h3>How many people work at your company?</h3>
                <div className="industry-grid">
                    {industries.map((size, index) => (
                        <button
                            key={index}
                            className="industry-button"
                            onClick={() => handleClick(size)}>{size}</button>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default ThirdPage;