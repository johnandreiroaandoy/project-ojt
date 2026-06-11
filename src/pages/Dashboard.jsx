import React from 'react';

// Dashboard component
// This page can be used to display reports, statistics,
// charts, or other information for the admin/user.
function Dashboard() {
    return (
        <div
            style={{
                padding: '20px', // Adds space inside the container
                fontFamily: 'sans-serif' // Sets a clean, readable font
            }}
        >
            {/* Main page heading */}
            <h2>
                {/* Dashboard title can be placed here */}
            </h2>

            {/* Horizontal line used to separate sections */}
            <hr
                style={{
                    border: '0',
                    borderTop: '1px solid #eee',
                    margin: '20px 0'
                }}
            />

            {/* 
                The previous dashboard metric cards
                (e.g., Total Reports, Total Users, etc.)
                were removed from this section.
                You can add new dashboard content here later.
            */}
            <p style={{ color: '#666' }}>
                {/* Placeholder text or future dashboard content */}
            </p>
        </div>
    );
}

// Makes the Dashboard component available for use in other files
export default Dashboard;