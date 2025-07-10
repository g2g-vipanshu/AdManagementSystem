import React, { useState } from 'react';
import {PostData} from '../../Api'; 
import './css/campaign.css'; 

function AddCampaignForm() {
  const [formData, setFormData] = useState({
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { campaign_name, start_date, end_date } = formData;
    if (!campaign_name || !start_date || !end_date) {
      alert('Please fill required fields');
      return;
    }

    try {
      const result = await PostData('/api/campaign/add', formData);

      if (result.is_sucess) {
        alert('✅ Campaign created successfully!');
        setFormData({});
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
      {Object.keys(formData).map((field) => (
        <div className="form-group" key={field}>
          <label className="form-label">{field.replace(/_/g, ' ')}</label>
          <input
            type={field.includes('date') ? 'date' : 'text'}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      ))}

      <button type="submit" className="submit-button">Submit Campaign</button>
    </form>
  );
}

export default AddCampaignForm;
