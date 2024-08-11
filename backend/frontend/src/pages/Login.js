import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const URL = process.env.REACT_APP_BACKEND_URL + "/api/login";

const Login = ({ isLoggedIn, setIsLoggedIn, setName, setEmail }) => {
  const navigate = useNavigate();

  const [email, setEmailState] = useState("");
  const [password, setPasswordState] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (isLoggedIn) navigate("dashboard");
  }, [isLoggedIn, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(URL, { email, password });
      console.log('Login response:', response.data);
      if (response.data.success) {
        
        const { name, email } = response.data.user;

       
        if (rememberMe) {
          localStorage.setItem('access', response.data.access);
          localStorage.setItem('refresh', response.data.refresh);
          localStorage.setItem('name', name);
          localStorage.setItem('email', email);
        } else {
          sessionStorage.setItem('access', response.data.access);
          sessionStorage.setItem('refresh', response.data.refresh);
          sessionStorage.setItem('name', name);
          sessionStorage.setItem('email', email);
        }

        setIsLoggedIn(true);
        setName(name);
        setEmail(email);

        toast.success("Logged in successfully!");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="w-full flex justify-center my-4">
      <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
          Login to your account
        </h5>
        <form
          className="w-full flex max-w-md flex-col gap-4"
          onSubmit={handleLogin}
        >
          <div>
            <div className="mb-2 block">
              <label htmlFor="email" className="text-sm font-medium required">
                Email
              </label>
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmailState(e.target.value)}
              placeholder="Your Email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              required
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2 block">
              <label
                htmlFor="password"
                className="text-sm font-medium required"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="forgotPassword"
                  className="font-semibold text-purple-600 hover:text-purple-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPasswordState(e.target.value)}
              placeholder="Your Password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              required
            />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="remember" className="text-sm font-medium">
              Remember me
            </label>
          </div>
          
          <button
            type="submit"
            className="focus:outline-none text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-800"
          >
            Submit
          </button>

          <p className="text-center text-sm text-gray-500">
            Not yet registered?{" "}
            <a
              href="register"
              className="font-semibold leading-6 text-purple-600 hover:text-purple-500"
            >
              Register Here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
