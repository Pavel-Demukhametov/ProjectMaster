import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Убедитесь, что импортировали axios
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
          // Получаем токены из localStorage
          const accessToken = localStorage.getItem('accessToken');
          const refreshToken = localStorage.getItem('refreshToken');

          // Делаем запрос с токенами в заголовке Authorization
          const response = await axios.get('http://127.0.0.1:8000/api/join-project/', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'x-refresh': refreshToken
            }
          });

          const data = response.data;
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
      // Убедитесь, что интересы не пустые и подготовлены к отправке
      const interestsToSend = Object.entries(interests).reduce((acc, [projectId, interestValue]) => {
        if (interestValue !== '') { // Предполагаем, что нам нужно отправить только непустые значения
          acc[projectId] = interestValue;
        }
        return acc;
      }, {});
    
      // Получаем токены из localStorage
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
    
      axios.post('http://127.0.0.1:8000/api/join-project/', interestsToSend, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'x-refresh': refreshToken,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('Успешно отправлено:', response.data);
        // Добавьте здесь действия после успешной отправки, например, вывод уведомления
      })
      .catch(error => {
        console.error('Ошибка при отправке:', error);
        // Добавьте обработку ошибок, например, вывод уведомления об ошибке
      });
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
        <SubmitButton onClick={handleSubmit} text="Отправить" />
      </div>
    );
};

export default OpenProjectCatalog;