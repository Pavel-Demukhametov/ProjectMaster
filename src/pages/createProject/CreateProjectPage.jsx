import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from '../../components/inputField/InputField';
import SubmitButton from '../../components/submitButton/submitButton';

const CreateProjectPage = () => {
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    students: [],
    curators: [],
    roles: []
  });

  const [allStudents, setAllStudents] = useState([]);
  const [allCurators, setAllCurators] = useState([]);
  const [allRoles, setAllRoles] = useState([]);

  useEffect(() => {
    axios.get('/api/students').then(response => {
      if (response.data && Array.isArray(response.data)) {
        setAllStudents(response.data);
      }
    }).catch(error => {
      console.error('Ошибка при получении данных о студентах:', error);
      setAllStudents([]);
    });
  
    axios.get('/api/curators').then(response => {
      if (response.data && Array.isArray(response.data)) {
        setAllCurators(response.data);
      }
    }).catch(error => {
      console.error('Ошибка при получении данных о кураторах:', error);
      setAllCurators([]);
    });
  
    axios.get('/api/roles').then(response => {
      if (response.data && Array.isArray(response.data)) {
        setAllRoles(response.data);
      }
    }).catch(error => {
      console.error('Ошибка при получении данных о ролях:', error);
      setAllRoles([]);
    });
  }, []);

  const handleInputChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field, value) => {
    setProjectData({ ...projectData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(projectData);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800">
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField label="Название проекта:" name="title" value={projectData.title} onChange={handleInputChange} />
        <InputField label="Описание проекта:" name="description" value={projectData.description} onChange={handleInputChange} />
        <MultiSelectDropdown label="Студенты в проекте:" name="students" options={allStudents} selectedOptions={projectData.students} handleSelectChange={handleSelectChange} />
        <MultiSelectDropdown label="Кураторы в проекте:" name="curators" options={allCurators} selectedOptions={projectData.curators} handleSelectChange={handleSelectChange} />
        <MultiSelectDropdown label="Роли в проекте:" name="roles" options={allRoles} selectedOptions={projectData.roles} handleSelectChange={handleSelectChange} />
        <SubmitButton text="Создать проект" onClick={handleSubmit} />
      </form>
    </div>
  );
};

const MultiSelectDropdown = ({ label, name, options, selectedOptions, handleSelectChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <select multiple name={name} value={selectedOptions} onChange={e => handleSelectChange(name, Array.from(e.target.selectedOptions, option => option.value))} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {options.map(option => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))}
      </select>
    </div>
  );
};

export default CreateProjectPage;