import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <h2 className="font-bold my-5 text-xl text-center">Welcome to Home</h2>
    </div>
  );
};

export default Home;
