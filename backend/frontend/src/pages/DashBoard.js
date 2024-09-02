import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const REFRESH_URL = process.env.REACT_APP_BACKEND_URL + "/api/refresh-token"; 

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh') || sessionStorage.getItem('refresh');
    if (!refreshToken) {
      throw new Error("No refresh token available.");
    }

    const response = await axios.post(REFRESH_URL, { refresh: refreshToken });

    const newAccessToken = response.data.access;
    const newRefreshToken = response.data.refresh;

    if (localStorage.getItem('access')) {
      localStorage.setItem('access', newAccessToken);
      localStorage.setItem('refresh', newRefreshToken);
    } else {
      sessionStorage.setItem('access', newAccessToken);
      sessionStorage.setItem('refresh', newRefreshToken);
    }

    return newAccessToken;
  } catch (err) {
    console.error('Failed to refresh token:', err);
  //  setError('Failed to refresh token. Please login again.');
    throw err;
  }
};



const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = process.env.REACT_APP_BACKEND_URL + "/api/dashboard";

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchDashboardData = async () => {
      let token = localStorage.getItem('access') || sessionStorage.getItem('access');
  
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
        } else 
        {
          setError('Failed to fetch dashboard data.');
        }
      } 
      catch (error)
       {
        if (error.response && error.response.status >= 401) 
          { 
          try 
          {
            token = await refreshToken(); 
            const response = await axios.get(URL, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
           
            });
    
           // if (response.data && response.data.Dashboard) {
              if (response.status === 200) {
                setDashboardData(response.data);
              } else {
                setError('Failed to fetch dashboard data.');
              }
          } 

          catch (refreshError) 
          {
            setError('Failed to refresh token and fetch dashboard data.');
            console.error('Error during token refresh:', refreshError);
          }
        } else {
          setError('Failed to perform analysis.');
          console.error('Error:', error);
        }       
        
        
        
        //console.error('Error fetching dashboard data:', error);
        //setError('Failed to fetch dashboard data.');
      }
      
      
      finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [URL]);

  const handleAddPortfolio = () => {
    navigate('/addasset'); // Navigate to AddPortfolio page
  };
  const handleCreatePortfolio = () => {
    navigate('/createportfolio'); // Navigate to CreatePortfolio page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
  <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto my-5 lg:py-0">
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
          Welcome, {dashboardData?.user?.name}
          </h1>
        <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
          Your Portfolios:
          </h2>
           {dashboardData?.user?.portfolios?.length > 0 ? (
            dashboardData.user.portfolios.map(portfolio => (
          <div key={portfolio.id}>
            <h3 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500">
              {portfolio.name}</h3>
          </div>
        ))
      ) : (
        <p>You have no portfolios.</p>
      )}
      <button onClick={handleCreatePortfolio} className="w-full focus:outline-none text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-800">
        Create Portfolio
      </button>
      <button onClick={handleAddPortfolio} className="w-full focus:outline-none text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-800">
        Add Asset to Portfolio
      </button>
      </div>
    </div>
  </div>
  );
};

export default Dashboard;
