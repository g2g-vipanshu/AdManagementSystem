import { useEffect, useState } from 'react';
import { GetData } from '../../Api';

function Userdashboard() {
        const [Campaign, setcampaign] = useState([])
         const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id = 2
        const campaignData = await GetData(`/api/campaign/?id=${user_id}`);
        if (campaignData) setcampaign(campaignData.message);
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
    <div>hello </div>
     <div style={{ padding: "20px" }}>
      <h2>Campaign Dashboard</h2>
      <div className="campaign-container">
        {Campaign.map((item) => (
          <div className="campaign-card" key={item.id}>
            <h3>{item.campaign_name}</h3>
            <p><strong>Type:</strong> {item.campaign_type}</p>
            <p><strong>Status:</strong> {item.status}</p>
            <p><strong>Area:</strong> {item.area}, {item.city}, {item.state}</p>
            <p><strong>Start:</strong> {item.start_date.split("T")[0]}</p>
            <p><strong>End:</strong> {item.end_date.split("T")[0]}</p>
            <p><strong>Objective:</strong> {item.objective}</p>
            <p><strong>Manager:</strong> {item.campaign_manager}</p>
            <p><strong>Message:</strong> {item.campaign_message}</p>
            {item.products && <p><strong>Products:</strong> {item.products}</p>}
            {item.dc_involved && <p><strong>DC:</strong> {item.dc_involved}</p>}
          </div>
        ))}
      </div>
    </div>
  </>
  )
}

export default Userdashboard;