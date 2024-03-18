import React, { useState, useEffect } from 'react';
import Card from '../../components/card/Card';
import MiniLoadingSpinner from '../../components/loading/MiniLoadingSpinner';


const Catalog = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/projects/');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex flex-wrap justify-center w-full"> {/* Изменено на w-full */}
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

export default Catalog;