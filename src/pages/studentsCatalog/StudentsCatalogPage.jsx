import React, { useState, useEffect } from 'react';
import StudentCard from './StudentCard';

const StudentsCatalogPage = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
        if (data.length === 0) {
          setStudents(testStudents);
        } else {
          setStudents(data);
        }
      } catch (error) {
        setError(error.message);
        setStudents(testStudents); // Использование тестовых данных при ошибке
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-4 bg-white dark:bg-gray-800">
      <h1 className="text-xl font-semibold mb-4 dark:text-trueWhite">Каталог студентов</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="grid grid-cols-1 gap-4">
        {students.map(student => (
          <StudentCard key={student.id} student={student} roles={roles} />
        ))}
      </div>
    </div>
  );
};

export default StudentsCatalogPage;