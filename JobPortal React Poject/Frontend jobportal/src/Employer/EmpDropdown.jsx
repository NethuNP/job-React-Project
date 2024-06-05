import React, { useState, useContext, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Switch from '@mui/material/Switch';
import { AuthContext } from "../Component/context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmpDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, dispatch } = useContext(AuthContext);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.href = "/login";
  };

  useEffect(() => {
    // Check if the toast message has been displayed
    const toastDisplayed = localStorage.getItem("toastDisplayed");
  
    if (user && !toastDisplayed) {
      // Display welcome message when user logs in
      toast.success(`Welcome ${user.businessOwner}`);
      // Set flag to indicate that the toast message has been displayed
      localStorage.setItem("toastDisplayed", "true");
    }
  }, [user]);

  return (
    <div className="flex items-center justify-end relative">
      <button
        type="button"
        className="flex text-sm bg-blue-950 rounded-full md:me-0 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-400"
        id="user-menu-button"
        aria-expanded={isDropdownOpen ? "true" : "false"}
        aria-controls="user-dropdown"
        onClick={toggleDropdown}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="h-10 w-10 rounded-full"
          src="/images/9131529.png"
          alt="user photo"
        />
      </button>

      {isDropdownOpen && (
        <div
          className="absolute right-0 z-50 text-base list-none bg-white divide-y divide-gray-100  shadow dark:bg-blue-950 dark:divide-gray-60 w-auto mt-64"
          id="user-dropdown"
        >
          <div className="px-4 py-3 flex items-center justify-between">
            <div>
              <span className="block text-sm text-blue font-semibold">
              {user.businessOwner}
              </span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                {user.email}
              </span>
            </div>

            {/* Assuming you need a Switch component */}
           {/*} <Switch
              checked={false} // Adjust this based on your role logic
              onChange={() => {}}
      />*/}
          </div>
          <ul className="py-2 " aria-labelledby="user-menu-button ">
            <li className="flex items-center pl-5 hover:bg-gray-100 dark:hover:bg-gray-600">
              <FaRegUser  />
              <a
                href="/userprofile"
                className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white flex items-center"
              >
                Profile
              </a>
            </li>

            <li className="flex items-center pl-5 hover:bg-gray-100 dark:hover:bg-gray-600">
              <IoSettingsOutline />
              <a
                href="#"
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white flex items-center"
              >
                Settings
              </a>
            </li>
            <li className="flex items-center pl-5 hover:bg-gray-100 dark:hover:bg-gray-600">
              <RiLogoutBoxRLine/>
              <a
                href="/login"
                onClick={handleLogout}
                className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white flex items-center"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmpDropdown;
