import { Avatar, Dropdown, Navbar } from "flowbite-react";
import UserIcon from "../images/user.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AppNavBar = (props) => {
  let navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn, name, setName, email, setEmail } = props;

  const handleLogout = () => {
    setIsLoggedIn(false);
    setName(null);
    setEmail(null);
    navigate("/");
    toast.success("You are successfully logged out!");
  };

  return (
    <Navbar fluid>
      <Navbar.Brand href="#">
        <img
          src= {UserIcon}
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
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
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      )}
      <Navbar.Collapse>
        
        {isLoggedIn && (
        <>  
            <Navbar.Link href="/profile" className="text-lg">
              Dashboard
            </Navbar.Link><Navbar.Link href="#" className="text-lg">
              About
            </Navbar.Link><Navbar.Link href="#" className="text-lg">
              Analyse
            </Navbar.Link><Navbar.Link href="#" className="text-lg">
              Tutorial
            </Navbar.Link><Navbar.Link href="#" className="text-lg">
              Support
            </Navbar.Link>
        </>
        )}
        {!isLoggedIn && (
          <Navbar.Link href="/login" className="text-lg">
            Login
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>

  );
};

export default AppNavBar;