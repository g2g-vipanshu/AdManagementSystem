import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostData } from '../../Api';
import './css/campaign.css';

function AddCampaign() {
  const navigate = useNavigate();

  const initialFormData = {
    campaign_name: '',
    campaign_type: '',
    start_date: '',
    end_date: '',
    objective: '',
    audience: '',
    state: '',
    city: '',
    area: '',
    products: '',
    sale_reps: '',
    dc_involved: '',
    campaign_manager: '',
    promotion_material: '',
    campaign_message: '',
    incentive_schema: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.campaign_name.trim()) newErrors.campaign_name = 'Campaign name is required';
    if (!formData.start_date.trim()) newErrors.start_date = 'Start date is required';
    if (!formData.end_date.trim()) newErrors.end_date = 'End date is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await PostData('/api/campaign/add', formData);
      if (result.is_sucess) {
        navigate('/userDashboard');
      } else {
        alert(result.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Server error, try again');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="campaign-form">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>

      <h2 className="form-title">Create New Campaign</h2>

      {Object.keys(formData).map((field) => (
        <div className="form-group" key={field}>
          <label className="form-label">
            {field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </label>
          <input
            type={field.includes('date') ? 'date' : 'text'}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className={`form-input ${errors[field] ? 'error' : ''}`}
          />
          {errors[field] && (
            <span className="error-message">{errors[field]}</span>
          )}
        </div>
      ))}

      <button type="submit" className="submit-button">
        Submit Campaign
      </button>
    </form>
  );
}

export default AddCampaign;