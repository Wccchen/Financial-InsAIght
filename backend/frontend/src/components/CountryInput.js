const countries = [
    "Select Country",
    "United States",
    "Japan",
    "Australia",
    "United Kingdom",
    "Taiwan"
  ];
  
  const CountryInput = () => {
    return (
      <div className="max-w-xl">
        <div className="mb-2 block">
          <label htmlFor="country" className="text-sm font-medium required">
            Country
          </label>
        </div>
        <select
          id="country"
          name="country"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          required
        >
          {countries.map((el, index) => (
            <option key={index}>{el}</option>
          ))}
        </select>
      </div>
    );
  };
  
  export default CountryInput;
  