import React, { useState, useEffect } from 'react';
import OpenCard from '../../components/card/OpenCard';
import MiniLoadingSpinner from '../../components/loading/MiniLoadingSpinner';
import SubmitButton from '../../components/submitButton/submitButton';

const OpenProjectCatalog = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [interests, setInterests] = useState({}); 
    const [showSubmitButton, setShowSubmitButton] = useState(false);

    useEffect(() => {
      const fetchProjects = async () => {
        setLoading(true);
        try {
          const response = await fetch('http://127.0.0.1:8000/api/projects/');
          const data = await response.json();
          setProjects(data);
          const initialInterests = data.reduce((acc, project) => ({ ...acc, [project.id]: '' }), {});
          setInterests(initialInterests);
          setShowSubmitButton(data.length > 0); // Определяем, есть ли проекты на странице
        } catch (error) {
          console.error('Error fetching projects:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProjects();
    }, []);
  
    const handleInterestChange = (projectId, value) => {
      setInterests(prev => ({ ...prev, [projectId]: value }));
    };
  
    const handleSubmit = () => {
      // Перебираем все ключи в объекте interests и устанавливаем значение 0, если оно пустое
      const updatedInterests = {};
      Object.keys(interests).forEach(projectId => {
        updatedInterests[projectId] = interests[projectId] === '' ? '0' : interests[projectId];
      });
      setInterests(updatedInterests); // Обновляем состояние с учетом изменений
      console.log(updatedInterests);
    };
  
    return (
      <div>
      <div className="flex flex-wrap justify-center w-full pb-3">
        {loading ? (
          <MiniLoadingSpinner />
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <OpenCard key={project.id} {...project} onInterestChange={handleInterestChange} />
          ))
        ) : (
          <p className="text-xl text-center w-full">Проекты не найдены.</p>
        )}
      </div>
      <SubmitButton
        onClick={handleSubmit}
        text="Отправить"
      />
    </div>
  );
};
  
  export default OpenProjectCatalog;