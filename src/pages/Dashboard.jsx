import React, { useState, useEffect } from 'react';

function Dashboard() {
    // 1. Create states to hold your PHP backend data
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    // 2. Fetch data from your XAMPP server automatically
    useEffect(() => {
        fetch('http://localhost/cgo-accountant-api/public/api/dashboard')
            .then(response => response.json())
            .then(data => {
                setStats(data.stats);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data from PHP:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading CGO System Metrics...</div>;

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>City Accountant Office Real-Time Metrics</h2>
            
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <h3>Pending Vouchers</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#e74c3c' }}>
                        {stats?.pending_vouchers}
                    </p>
                </div>

                <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <h3>Approved Budgets</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2ecc71' }}>
                        {stats?.approved_budgets}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;