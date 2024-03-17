import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import InputField from '../../components/inputField/InputField';
import SubmitButton from '../../components/submitButton/submitButton';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    surname: '',
    name: '',
    patronymic: '',
    email: '',
    direction: '',
    course: '',
    password: '',
  });

  const [directions, setDirections] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/registration/')
      .then(response => {
        if (response.data) {
          setDirections(response.data.directions);
          setCourses(response.data.courses);
        }
      }).catch(error => {
        console.error("Ошибка при получении данных:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLogin = (email, password) => {
    axios.post('http://127.0.0.1:8000/api/auth/login', { email, password })
      .then(response => {
        const { access, refresh } = response.data;
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        navigate('/homepage'); // Перенаправление на страницу пользователя
      })
      .catch(error => {
        toast.error("Ошибка при входе");
        console.error("Ошибка входа:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      full_name: `${userData.surname} ${userData.name} ${userData.patronymic}`,
      email: userData.email,
      password: userData.password,
      course: Number(userData.course),

      direction: Number(userData.direction), 
    };

    axios.post('http://127.0.0.1:8000/api/registration/', requestData)
      .then(response => {
        if (response.status === 201) {
          toast.success("Регистрация прошла успешно!");
          handleLogin(userData.email, userData.password);
        } else {
          toast.error(response.data.message || "Ошибка регистрации");
        }
      })
      .catch(error => {
        let errorMessage = "Произошла ошибка при регистрации!";
        if (error.response && error.response.data && error.response.data.email) {
          errorMessage = error.response.data.email.join(' ');
        }
        toast.error(errorMessage);
        console.error("Ошибка регистрации:", error);
      });
  };

  return (
    <div className="flex justify-center min-h-screen">
      <ToastContainer />
      <div className="w-full max-w-[1300px] ">
        <main className="mt-[10%] w-full h-[100vh] ">
          <form className="max-w-[400px] mx-auto p-5 shadow-xl rounded-xl " onSubmit={handleSubmit}>

            <InputField label="Фамилия" name="surname" required value={userData.surname} onChange={handleInputChange} />

            <InputField label="Имя" name="name" required value={userData.name} onChange={handleInputChange} />

            <InputField label="Отчество" name="patronymic" value={userData.patronymic} onChange={handleInputChange} />

            <InputField label="Email" name="email" type="email" required value={userData.email} onChange={handleInputChange} />
            {/* Направление */}
            <div className="mb-6">
              <label htmlFor="direction" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Направление</label>
              <select name="direction" id="direction" required onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option value="">Выберите направление</option>
                {directions.map((direction) => (
                  <option key={direction.id} value={direction.id}>{direction.direction_name}</option>
                ))}
              </select>
            </div>
            {/* Курс */}
            <div className="mb-6">
              <label htmlFor="course" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Курс</label>
              <select name="course" id="course" required onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option value="">Выберите курс</option>
                {courses.map((course) => (
                    
                  <option key={course.id} value={course.id}>{course.course_name}</option>
                ))}
              </select>
            </div>
            <InputField label="Пароль" name="password" type="password" required value={userData.password} onChange={handleInputChange} />

            <button type="submit" className="w-full  bg-[#89abfc] dark:bg-[#4b6cb7] hover:bg-[#4b6cb7] dark:hover:bg-[#89abfc] text-customGray dark:text-trueWhite hover:text-trueWhite dark:hover:text-customGray font-semibold rounded-md transition duration-300 p-2.5">Зарегистрироваться</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default SignUpPage;
           
