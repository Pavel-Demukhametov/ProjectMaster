import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', loginData)
      .then(response => {
        if(response.data.success) {
          toast.success("Вход выполнен успешно!");
          navigate('/welcomepage');
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(error => {
        toast.error("Произошла ошибка при входе!");
        console.error("Ошибка входа:", error);
      });
  };

  return (
    <div className="flex justify-center min-h-screen">
      <ToastContainer />
      <div className="w-full max-w-[1300px] ">
        <main className="mt-[10%] w-full h-[100vh] ">
          <form className="max-w-[400px] mx-auto p-5 shadow-xl rounded-xl" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
              <input type="email" name="email" id="email" required onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            {/* Пароль */}
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Пароль</label>
              <input type="password" name="password" id="password" required onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            {/* Кнопка входа */}
            <button type="submit" className="w-full bg-[#89abfc] dark:bg-[#4b6cb7] hover:bg-[#4b6cb7] dark:hover:bg-[#89abfc] text-customGray dark:text-trueWhite hover:text-trueWhite dark:hover:text-customGray font-semibold rounded-md transition duration-300 p-2.5">Войти</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default LoginPage;