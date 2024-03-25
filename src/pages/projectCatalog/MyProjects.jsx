import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Убедитесь, что импортировали axios
import Card from '../../components/card/Card';
import MiniLoadingSpinner from '../../components/loading/MiniLoadingSpinner';

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // Получаем токен доступа из localStorage
        const accessToken = localStorage.getItem('accessToken');

        // Выполняем запрос с токеном авторизации в заголовках
        const response = await axios.get('http://127.0.0.1:8000/api/project-list/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex flex-wrap justify-center w-full">
      {loading ? (
        <MiniLoadingSpinner />
      ) : projects.length > 0 ? (
        projects.map((project) => (
          <Card key={project.id} {...project} />
        ))
      ) : (
        <p className="text-xl text-center w-full">Проекты не найдены.</p>
      )}
    </div>
  );
};

export default MyProjects;