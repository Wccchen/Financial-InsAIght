import React from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import UserIcon from "../images/user.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
    navigate("/login");
    toast.success("You are successfully logged out!");
  };

  return (
    <Navbar fluid>
      <Navbar.Brand href="/">
        <img
          src={UserIcon}
          className="mr-3 h-6 sm:h-9"
          alt="Finance Insight Logo"
        />
        <span className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">
          Finance Insight
        </span>
      </Navbar.Brand>
      {isLoggedIn && (
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img={UserIcon} rounded />}
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
          <Navbar.Toggle />
        </div>
      )}
      <Navbar.Collapse>
        <div className="flex justify-center items-center space-x-4">
          {isLoggedIn && (
            <>
              <Navbar.Link href="/dashboard" className="text-lg">
                Dashboard
              </Navbar.Link>
              <Navbar.Link href="/profile" className="text-lg">
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
            </>
          )}
          {!isLoggedIn && (
            <Navbar.Link href="/login" className="text-lg">
              Login
            </Navbar.Link>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavBar;
