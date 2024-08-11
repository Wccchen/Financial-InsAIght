import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = process.env.REACT_APP_BACKEND_URL + "/api/dashboard";

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('access') || sessionStorage.getItem('access');
  
      if (!token) {
        setError('User is not authenticated.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(URL, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setDashboardData(response.data);
        } else {
          setError('Failed to fetch dashboard data.');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to fetch dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [URL]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Welcome, {dashboardData?.user?.name}</h1>
      <h2>Your Portfolios:</h2>
      {dashboardData?.user?.portfolios?.length > 0 ? (
        dashboardData.user.portfolios.map(portfolio => (
          <div key={portfolio.id}>
            <h3>{portfolio.name}</h3>
          </div>
        ))
      ) : (
        <p>You have no portfolios.</p>
      )}
    </div>
  );
};

export default Dashboard;
