import axios from "axios";
import { toast } from "react-toastify";

const URL = process.env.REACT_APP_BACKEND_URL + "/api/forgotPassword";

const ForgotPassword = () => {
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const email = ev.target.email.value;
    const formData = { email: email };
    const res = await axios.post(URL, formData);
    const data = res.data;
    if (data.success === true) toast.success(data.message);
    else toast.error(data.message);
  };

  return (
    <div className="flex justify-center my-4">
      <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
          Forgot Password
        </h5>
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <label htmlFor="email" className="text-sm font-medium required">Email</label>
            </div>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              required
            />
          </div>
          <div className="mt-2 block">
            <button
              type="submit"
              class="w-full focus:outline-none text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-800"
            >
              Submit
            </button>
          </div>
          <p className="text-center text-sm text-gray-500">
            Remember your password?{" "}
            <a
              href="login"
              className="font-semibold leading-6 text-purple-600 hover:text-purple-500"
            >
              Login Here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;