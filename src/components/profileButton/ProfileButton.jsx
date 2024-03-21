
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const ProfileButton = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsDarkMode(accessToken !== null);
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsDarkMode(false); 
    setIsDropdownOpen(false); 
    navigate('/'); 
  };

  return (
    <div className="relative ml-4">
      <button className="text-gray-800 dark:text-white" onClick={handleDropdownToggle}>
        <img
          src="profile2.png"
          alt="Профиль"
          className="h-8 w-8"
          style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}
        />
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg rounded-lg">
          <button className="block w-full py-2 px-4 text-gray-800 dark:text-white text-left hover:bg-gray-100 dark:hover:bg-gray-700" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;