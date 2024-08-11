import React from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import UserIcon from "../images/user.png";
import { toast } from "react-toastify";
import { useNavigate, NavLink } from "react-router-dom";

const AppNavBar = (props) => {
  let navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, name, setName, email, setEmail } = props;

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setName(null);
    setEmail(null);
    navigate("/");
    toast.success("You are successfully logged out!");
  };

  return (
    <Navbar fluid className="justify-between">
      <div className="flex items-center">
        <Navbar.Brand as="div">
          <NavLink to="/" className="flex items-center">
            <img
              src={UserIcon}
              className="mr-2 h-8"
              alt="Finance Insight Logo"
            />
            <span className="self-center text-3xl font-semibold dark:text-white">
              Finance Insight
            </span>
          </NavLink>
        </Navbar.Brand>
      </div>
      <div className="flex items-center ml-auto">
        <div className="flex space-x-4">
          <Navbar.Link as={NavLink} to="/dashboard" className="text-lg">
            Dashboard
          </Navbar.Link>
          <Navbar.Link as={NavLink} to="/profile" className="text-lg">
            Profile
          </Navbar.Link>
          <Navbar.Link href="#" className="text-lg">
            Analyse
          </Navbar.Link>
          <Navbar.Link href="#" className="text-lg">
            Tutorial
          </Navbar.Link>
          <Navbar.Link href="#" className="text-lg">
            Support
          </Navbar.Link>
          {!isLoggedIn && (
            <Navbar.Link as={NavLink} to="/login" className="text-lg">
              Login
            </Navbar.Link>
          )}
        </div>
        {isLoggedIn && (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img={UserIcon} rounded />}
            className="ml-4"
          >
            <Dropdown.Header>
              <span className="block text-sm">{name}</span>
              <span className="block truncate text-sm font-medium">
                {email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={() => navigate("/profile")}>
              Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navigate("/dashboard")}>
              Dashboard
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
          </Dropdown>
        )}
      </div>
    </Navbar>
  );
};

export default AppNavBar;
