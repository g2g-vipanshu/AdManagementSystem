import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import './css/Dashboard.css';

function CampaignDetail() {
    const { state: campaign } = useLocation();
    const navigate = useNavigate();

    if (!campaign) {
        return <p>No campaign data available</p>;
    }

    return (
        <>
            <Header />
            <div className="campaign-detail-container">
                <button className="back-button" onClick={() => navigate(-1)}>
                    &larr; Back
                </button>
                <h2>{campaign.campaign_name.toUpperCase()}</h2>
                <p><strong>Type:</strong> {campaign.campaign_type}</p>
                <p><strong>Dates:</strong> {campaign.start_date.split("T")[0]} to {campaign.end_date.split("T")[0]}</p>
                <p><strong>Location:</strong> {campaign.area}, {campaign.city}, {campaign.state}</p>
                <p><strong>Objective:</strong> {campaign.objective}</p>
                <p><strong>Audience:</strong> {campaign.audience}</p>
                <p><strong>Manager:</strong> {campaign.campaign_manager}</p>
                <p><strong>Message:</strong> {campaign.campaign_message}</p>
                {campaign.products && <p><strong>Products:</strong> {campaign.products}</p>}
                <p><strong>Status:</strong> {campaign.status}</p>
            </div>
        </>
    );
}

export default CampaignDetail;