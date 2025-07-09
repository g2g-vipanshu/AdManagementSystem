import React from 'react';
import './css/SecondPage.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext'

function SecondPage() {
    const navigate = useNavigate();
    const { setUserData } = useContext(UserContext);
    const [name, setName] = useState('');

    const handleNext = () => {
        setUserData((prev) => ({ ...prev, name }));
        navigate('/third')
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="header-left">
                    <img src="/g2g-logo.jpeg" alt="Logo" className="logo" />
                    <button className="back-button" onClick={() => navigate(-1)}><b>&lt; Back</b></button>
                </div>
            </header>

            <main className="form-section">
                <h1 className='form-heading'>What is your company's name?</h1>
                <input
                    type="text"
                    id="fullName"
                    className="form-input"
                    placeholder="Enter your full company name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button className="next-button" onClick={handleNext}>Next</button>
            </main>
        </div>
    );
}

export default SecondPage;