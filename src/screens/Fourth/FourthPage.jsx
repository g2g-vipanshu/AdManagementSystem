import React from 'react';
import './css/FourthPage.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { PostData } from '../../Api';

function FourthPage() {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserContext);
    const [Loading, setLoading] = useState(false)
    const [link, setLink] = useState('');

    const handleSubmit = async() => {
        // const finalData = { ...userData, link };
        // console.log("Form Submitted", finalData);
        // const submission = await PostData("/api/submitform/", finalData)
        // navigate("/dashboard")
         try {
      setLoading(true);
      const finalData = { ...userData, link };
      console.log("Form Submitted", finalData);

      const response = await PostData("/api/submitform/", finalData);

      if (response?.is_success) {
        navigate("/dashboard");
      } else {
        alert("Submission failed. Please try again.");
        console.error(response);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred during submission.");
    } finally {
      setLoading(false);
    }
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="header-left">
                    <img src="/g2g-logo.jpeg" alt="Logo" className="logo" />
                    <button className="back-button" onClick={() => navigate(-1)}><b>&lt; Back</b></button>
                </div>
            </header>

            <main className="center-content">
                <h1 className="main-heading">What is your company's website?</h1>
                <input
                    type="text"
                    placeholder="Add your website link"
                    className="form-input"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <button className="create-button" onClick={handleSubmit}>Create Account</button>
                <p className="info-text">
                    By creating an account, you agree to our Terms and Conditions.
                </p>
            </main>
        </div>
    );
}

export default FourthPage;