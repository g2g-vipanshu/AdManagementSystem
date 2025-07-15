import { useEffect, useState } from 'react';
import { GetData } from '../../Api';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import './css/Dashboard.css';

function Userdashboard() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id = localStorage.getItem('id');
        const campaignData = await GetData(`/api/campaign/?id=${user_id}`);
        if (campaignData) setCampaigns(campaignData.message);
      } catch (err) {
        console.error("Failed to fetch campaign data:", err);
        setError("Failed to load campaign data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading campaigns...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Header />
      <div className="user-dashboard">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate('/dashboard')}
        >
          &larr; Back
        </button>
        <h2 className="campaign-heading">My Campaigns</h2>

        <div className="campaign-list-header">
          <span>Campaign Name</span>
          <span>Start Date</span>
          <span>End Date</span>
        </div>

        <ul className="campaign-list">
          {campaigns.map((item) => (
            <li
              key={item.id}
              className="campaign-list-item"
              onClick={() => navigate(`/campaign-details/${item.id}`, { state: item })}
            >
              <span className="campaign-title">{item.campaign_name}</span>
              <span>{item.start_date.split('T')[0]}</span>
              <span>{item.end_date.split('T')[0]}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Userdashboard;