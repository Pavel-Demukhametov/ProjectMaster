import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ id, project_name, description, created_date, status }) => {
  return (
    <article className="w-full group p-4 rounded-md shadow-md bg-white dark:bg-gray-800 hover:bg-gray-100 hover:dark:bg-gray-700 relative">
      <div className="absolute right-4 top-4 text-sm text-gray-500 dark:text-gray-300">
        {status}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-300 mb-2">
        {new Date(created_date).toLocaleDateString()}
      </div>
      <Link to={`/projects/${id}`} className="no-underline">
        <div>
          <h3 className="mt-2 text-lg font-semibold leading-6 text-left dark:text-blueText">
            {project_name || "Проект без названия"}
          </h3>
          <p className="mt-2 text-sm leading-6 text-left line-clamp-3 text-gray-600 dark:text-gray-400">
            {description || "Описание отсутствует"}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default Card;