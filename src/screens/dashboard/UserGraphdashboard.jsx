


import React, { useState, useEffect } from 'react';
import { GetData } from '../../Api';
import './css/Dashboard.css';
import Header from '../Header/Header';
import '../Header/css/Header.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

function UserGraphdashboard() {
  const [total, setTotal] = useState([]);
  const [addwise, setAddwise] = useState([]);
  const [location, setLocation] = useState([]);
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const id = localStorage.getItem("id");
      try {
        const [totalView, addWise, locationData, trendData] = await Promise.all([
          GetData("/api/get/total_view_id/"),
          GetData("/api/get/addwise_id/"),
          GetData("/api/get/location_id/"),
          GetData(`/api/campaign/?id=${id}`)
        ]);

        if (totalView) setTotal(totalView.message);
        if (addWise) setAddwise(addWise.message);
        if (locationData) setLocation(locationData.message);
        if (trendData) setCampaign(trendData.message ?? trendData);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="dashboard">
      <Header />

      {total.length > 0 && (
        <div className="dashboard-main">
          <div className="stat-card">
            <h3>Total Views</h3>
            <p className="stat-value">{total[0].Total_Views}</p>
          </div>
          <div className="stat-card">
            <h3>Total Clicks</h3>
            <p className="stat-value">{total[0].Total_Clicks}</p>
          </div>
          <div className="stat-card">
            <h3>CTR</h3>
            <p className="stat-value">{total[0].CTR}%</p>
          </div>
        </div>
      )}

      <LocationSummary data={location} />
      <MonthlyViewsChart data={addwise} />
      <SingleCampaignCard campaign={campaign} />
    </div>
  );
}

function LocationSummary({ data }) {
  return (
    <div className="location-main">
      {data.map((item, index) => (
        <div className="location-card" key={index}>
          <div className="location-name">{item.location}</div>
          <div className="metrics">
            <div className="metric">Ajio Views: {item.ajio_views}</div>
            <div className="metric">Qurez Views: {item.qurez_views}</div>
            <div className="metric">TM Views: {item.tm_views}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MonthlyViewsChart({ data }) {
  return (
    <div className="monthly-views-container">
      <h2 className="section-title">Monthly Views by Platform</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Ajio_Views_Cumulative" stroke="#8884d8" name="Ajio" />
          {/* <Line type="monotone" dataKey="TM_Views_Cumulative" stroke="#82ca9d" name="TM Views" />
          <Line type="monotone" dataKey="Qurez_Views_Cumulative" stroke="#ff7300" name="Qurez" /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function SingleCampaignCard({ campaign }) {
  if (!campaign) return null;

  return (
    <div className="trend-campaign-section">
      <h2 className="section-title">Campaign Spotlight</h2>
      <div className="campaign-wrapper">
        <div className="campaign-container">
          <div className="campaign-card" key={campaign.id}>
            <h3>{campaign.campaign_name?.toUpperCase()}</h3>
            <div className="campaign-details">
              <p><strong>Type:</strong> {campaign.campaign_type}</p>
              <p><strong>Area:</strong> {campaign.area}, {campaign.city}, {campaign.state}</p>
              <p><strong>Start:</strong> {campaign.start_date?.split("T")[0]}</p>
              <p><strong>End:</strong> {campaign.end_date?.split("T")[0]}</p>
              <p><strong>Manager:</strong> {campaign.campaign_manager}</p>
              <p><strong>Message:</strong> {campaign.campaign_message}</p>
              {campaign.products && <p><strong>Products:</strong> {campaign.products}</p>}
              <p><strong>Status:</strong> {campaign.status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserGraphdashboard;
