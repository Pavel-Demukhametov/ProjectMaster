import React, { useState, useEffect } from 'react';
import StudentCard from './StudentCard';
import SubmitButton from '../../components/submitButton/submitButton';

const StudentsCatalogPage = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [studentRoles, setStudentRoles] = useState({}); 
  // Тестовые данные
  const testStudents = [
    { id: 1, name: 'Иван Иванов', course: 'Информатика' },
    { id: 2, name: 'Мария Петрова', course: 'Математика' },
    { id: 3, name: 'Сергей Сидоров', course: 'Физика' }
    // Дополнительные тестовые данные...
  ];

  const roles = [
    { id: 1, label: 'Разработчик' },
    { id: 2, label: 'Дизайнер' },
    { id: 3, label: 'Аналитик' }
    // Дополнительные роли...
  ];
  const handleRolesChange = (studentId, roles) => {
    setStudentRoles(prev => ({ ...prev, [studentId]: roles }));
};

const handleSubmit = () => {
    console.log("Отправка данных студентов и их ролей на сервер:", studentRoles);
    // Здесь код для отправки studentRoles на сервер...
};

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      setError(null);
  
      try {
        const response = await fetch('http://127.0.0.1:8000/api/students/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStudents(data); // Непосредственно установка полученных данных без условий на тестовые данные
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchStudents();
  }, []);

  return (
    <div className="p-4 bg-white dark:bg-gray-800">
        {/* Остальной код UI */}
        <div className="flex flex-col gap-2">
        {students.map(student => (
            <StudentCard 
              key={student.id} 
              student={student} 
              roles={roles} 
              onRolesChange={handleRolesChange} // Передаем функцию как проп
            />
        ))}
        </div>
        <div className="mt-4">
            <SubmitButton text="Отправить данные" onClick={handleSubmit} />
        </div>
    </div>
);
};

export default StudentsCatalogPage;