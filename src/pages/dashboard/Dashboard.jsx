import React, { use, useState } from 'react'
import { useEffect } from 'react';
import { GetData, PostData, PutData } from '../../Api';
import './dashboard.css'


import { BarChart, Bar,  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";


function Trendcampaign({data}){
    return (
     <div style={{ padding: "20px" }}>
      <h2>Trending Advertisments</h2>
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

      </div>
)}

function LocationSummary({ data }) {
  return (
    <div className="main">
      {data.map((item, index) => (
        <div className="location-card" key={index}>
          <div className="location-name">{item.location}</div>
          <div className="metrics">
            <div className="metric">Ajio Views: {item.Ajio_Views}</div>
            <div className="metric">Qurez Views: {item.Qurez_Views}</div>
            <div className="metric">TM Views {item.TM_Views}</div>
          </div>
        </div>
      ))}
    </div>  
  );
}


function MonthlyViewsChart({ data }) {
  return (
    <div style={{ width: "100%", height: "500px", padding: "20px" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Monthly Views by Platform</h2>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
        >
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


function Dashboard() {
  const [product, setProduct] = useState([]);
  const [total, settotal] = useState([])
  const [addwise, setaddwise] = useState([])
  const [location, setlocation] = useState([])
  const [trend, settrend] = useState([])
   const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, totalView, addWise, locationData, trendata] = await Promise.all([
          GetData("/api/pd"),
          GetData("/api/total_view/"),
          GetData("/api/addwise/"),
          GetData("/api/locationwise/"),
          GetData("/api/campaign/?id=2")
        ]);

        if (productData) setProduct(productData.message);
        if (totalView) settotal(totalView.message);
        if (addWise) setaddwise(addWise.message);
        if (locationData) setlocation(locationData.message);
        if (trendata) settrend(trendata.message)

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
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
        {total.length > 0 && (
        <div className='main'>
            {/* Total Views Box */}
            <div className='id' >
            <h3>Total Views</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{total[0].Total_Views}</p>
            </div>

            {/* Total Clicks Box */}
            <div className='id'>
            <h3>Total Clicks</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{total[0].Total_Clicks}</p>
            </div>

            {/* CTR Box */}
            <div className='id'>
            <h3>CTR</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{total[0].CTR}%</p>
            </div>
        </div>
        )}

        {/* location row */}
        <div>
            <LocationSummary data={location}/>
        </div>

         <MonthlyViewsChart data={addwise} />
         <Trendcampaign data = {trend}/>
         <div className='support'>
            <h3>Brands that are celebrating with us!</h3>
         </div>
    </div>

        );
}

export default Dashboard;
