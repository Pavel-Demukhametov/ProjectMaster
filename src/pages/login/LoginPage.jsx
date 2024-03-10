import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputField from '../../components/inputField/InputField';
import SubmitButton from '../../components/submitButton/submitButton';

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
            <InputField label="Email" name="email" type="email" required value={loginData.email} onChange={handleInputChange} />

            <InputField label="Пароль" name="password" type="password" required value={loginData.password} onChange={handleInputChange} />

            <SubmitButton text="Войти" onClick={handleSubmit} />
          </form>
        </main>
      </div>
    </div>
  );
};

export default LoginPage;