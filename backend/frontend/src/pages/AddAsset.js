import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

const AddAsset = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loadingPortfolios, setLoadingPortfolios] = useState(true);
  const [error, setError] = useState(null);

  const URL = process.env.REACT_APP_BACKEND_URL + "/api/addasset";
  const portfoliosURL = process.env.REACT_APP_BACKEND_URL + "/api/dashboard"; // URL to fetch portfolios

  useEffect(() => {
    const fetchPortfolios = async () => {
      const token = localStorage.getItem('access') || sessionStorage.getItem('access');
      if (!token) {
        setError('User is not authenticated.');
        setLoadingPortfolios(false);
        return;
      }

      try {
        const response = await axios.get(portfoliosURL, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (response.data.user && response.data.user.portfolios) {
          setPortfolios(response.data.user.portfolios);
        } else {
          setError('Failed to load portfolios.');
        }
      } catch (err) {
        setError('Failed to load portfolios.');
        console.error('Error:', err);
      } finally {
        setLoadingPortfolios(false);
      }
    };

    fetchPortfolios();
  }, [portfoliosURL]);

  const handlePortfolio = async (ev) => {
    ev.preventDefault();
    const portfolioId = ev.target.portfolio.value;
    const asset_name = ev.target.asset_name.value;
    const asset_type = ev.target.asset_type.value;
    const quantity = ev.target.quantity.value;
    const purchase_price = ev.target.purchase_price.value;
    const current_value = ev.target.current_value.value;
    const purchase_date = ev.target.purchase_date.value;
    const token = localStorage.getItem('access') || sessionStorage.getItem('access');
    
    const formData = {
      portfolio_id: portfolioId,
      asset_name: asset_name,
      asset_type: asset_type,
      quantity: quantity,
      purchase_price: purchase_price,
      current_value: current_value,
      purchase_date: purchase_date
    };
    
    try {
      const res = await axios.post(URL, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Include token in headers
        },
      });
      const data = res.data;
      if (data.success === true) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log("Some error occurred", err);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto my-5 lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Add Asset to your portfolio
          </h1>
          {error && <p className="error-message">{error}</p>}
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handlePortfolio}
          >
            <div>
              <div className="mb-2 block">
                <label htmlFor="portfolio" className="text-sm font-medium required">
                  Portfolio
                </label>
              </div>
              {loadingPortfolios ? (
                <p>Loading portfolios...</p>
              ) : (
                <select
                  id="portfolio"
                  name="portfolio"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  required
                >
                  <option value="">Select a Portfolio</option>
                  {portfolios.map((portfolio) => (
                    <option key={portfolio.id} value={portfolio.id}>
                      {portfolio.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <div className="mb-2 block">
                <label htmlFor="asset_name" className="text-sm font-medium required">
                  Asset Name
                </label>
              </div>
              <input
                id="asset_name"
                name="asset_name"
                type="text"
                placeholder="Your asset (e.g., AAPL)"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <label htmlFor="asset_type" className="text-sm font-medium required">
                  Asset Type
                </label>
              </div>
              <input
                type="text"
                name="asset_type"
                id="asset_type"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                placeholder="e.g., Stock, Bonds, Funds"
                required
              />
            </div>

            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <div className="mb-2 block">
                  <label
                    htmlFor="quantity"
                    className="text-sm font-medium required"
                  >
                    Quantity
                  </label>
                </div>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  placeholder="e.g, 100"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <label
                    htmlFor="purchase_price"
                    className="text-sm font-medium required"
                  >
                    Unit Cost
                  </label>
                </div>
                <input
                  type="number"
                  step="0.01"
                  name="purchase_price"
                  id="purchase_price"
                  placeholder="e.g., 140.55"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  required
                />
              </div>
            </div>

            <div>
              <div className="mb-2 block">
                <label htmlFor="current_value" className="text-sm font-medium required">
                  Price
                </label>
              </div>
              <input
                type="number"
                step="0.01"
                id="current_value"
                name="current_value"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                placeholder="e.g., 160"
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <label htmlFor="purchase_date" className="text-sm font-medium required">
                  Purchase Date
                </label>
              </div>
              <input
                id="purchase_date"
                name="purchase_date"
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                required
              />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  required
                  aria-describedby="terms"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="terms"
                  className="font-light text-gray-500 dark:text-gray-300"
                >
                  I accept the{" "}
                  <a
                    className="font-medium text-purple-600 hover:underline dark:text-purple-500"
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full focus:outline-none text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-800"
            >
              Submit
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAsset;
