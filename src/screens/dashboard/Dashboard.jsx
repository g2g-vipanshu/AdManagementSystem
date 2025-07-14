import React, { useState } from 'react';
import { useEffect } from 'react';
import { GetData } from '../../Api';
import './css/Dashboard.css';
import Header from '../Header/Header';
import '../Header/css/Header.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

function Dashboard() {
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState([]);
  const [addwise, setAddwise] = useState([]);
  const [location, setLocation] = useState([]);
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      console.log("sag", token)
      try {
        const [productData, totalView, addWise, locationData, trendData] = await Promise.all([
          GetData("/api/pd"),
          GetData("/api/total_view/"),
          GetData("/api/addwise/"),
          GetData("/api/locationwise/"),
          GetData("/api/campaign/?id=2")
        ]);
        if (productData) setProduct(productData.message);
        if (totalView) setTotal(totalView.message);
        if (addWise) setAddwise(addWise.message);
        if (locationData) setLocation(locationData.message);
        if (trendData) setTrend(trendData.message);
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
      <Trendcampaign data={trend} />
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
            <div className="metric">Ajio Views: {item.Ajio_Views}</div>
            <div className="metric">Qurez Views: {item.Qurez_Views}</div>
            <div className="metric">TM Views: {item.TM_Views}</div>
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
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Ajio_Views" stroke="#8884d8" name="Ajio" />
          <Line type="monotone" dataKey="TM_Views" stroke="#82ca9d" name="TM Views" />
          <Line type="monotone" dataKey="Qurez_View" stroke="#ff7300" name="Qurez" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


function Trendcampaign({ data }) {
  return (
    <div className="trend-campaign-section">
      <h2 className="section-title">Trending Advertisments</h2>
      <div className="campaign-wrapper">
        <div className="campaign-container">
          {data.map((item) => (
            <div className="campaign-card" key={item.id}>
              <h3>{item.campaign_name}</h3>
              <div className="campaign-details">
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
            </div>
          ))}
        </div>
      </div>
      <div className="support">
        <h3>Brands that are celebrating with us!</h3>
      </div>
    </div>
  )
}

export default Dashboard;