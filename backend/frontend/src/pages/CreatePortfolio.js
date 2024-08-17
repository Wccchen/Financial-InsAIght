import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

const CreatePortfolio = () => {
  const [error, setError] = useState(null);

  const URL = process.env.REACT_APP_BACKEND_URL + "/api/createportfolio";

  const handlePortfolio = async (ev) => {
    ev.preventDefault();
    const portfolio_name = ev.target.name.value.trim(); 
    const token = localStorage.getItem('access') || sessionStorage.getItem('access');
    
    const formData = {
      portfolio_name: portfolio_name,
    };
    
    try {
      const res = await axios.post(URL, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = res.data;
      if (data.success === true) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
        setError(data.message);
      }
    } catch (err) {
      console.log("Some error occurred", err);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto my-5 lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Create a New Portfolio
          </h1>
          {error && <p className="error-message">{error}</p>}
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handlePortfolio}
          >
            <div>
              <div className="mb-2 block">
                <label htmlFor="name" className="text-sm font-medium required">
                  Portfolio Name
                </label>
              </div>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Amanda's Portfolio"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                required
              />
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

export default CreatePortfolio;