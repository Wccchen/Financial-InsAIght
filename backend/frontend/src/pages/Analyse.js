import React, { useState } from 'react';
import axios from 'axios';

const Analyse = () => {
  const [inputText, setInputText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const URL = process.env.REACT_APP_BACKEND_URL + "/api/analyse";

  const handleAnalyse = async () => {
    if (!inputText.trim()) {
      setError('Input text cannot be empty.');
      setAnalysisResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysisResult(null);

    const token = localStorage.getItem('access') || sessionStorage.getItem('access');
    if (!token) {
      setError('User is not authenticated.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(URL, { text: inputText }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }, 
      });
      //console.log(response.data);
      if (response.data && response.data.analysis) {
        const results = response.data.analysis;
        console.log('Results:', results);
        setAnalysisResult(results);
      } else {
        setError('No results found.');
      }
    } 
    catch (err) {
      setError('Failed to perform analysis.');
      console.error('Error:', err);
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto my-5 lg:py-0">
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
          Analyse the text
        </h1>
        <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to analyse"
        rows={4}
        style={{ width: '100%', height: '150px', padding: '10px', fontSize: '1rem' }}  
        className="text-input"
        />
      <button onClick={handleAnalyse} disabled={loading} className="w-full focus:outline-none text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-800">
        {loading ? 'Analysing...' : 'Analyse'}
      </button>
      {error && <p className="error-message">{error}</p>}
      {analysisResult && (
        <div className="analysis-result">
          <h3>Analysis Result:</h3>
          {Object.entries(analysisResult).map(([label,score]) =>(
            <p key = {label}>{label}: {score}</p>
          ))}
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default Analyse;
