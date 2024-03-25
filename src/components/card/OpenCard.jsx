import React from 'react';
import { Link } from 'react-router-dom';

const OpenCard = ({ id, project_name, description, created_date, status_name, onInterestChange }) => {
  return (
    <article className="w-full group p-4 rounded-md shadow-md bg-white dark:bg-gray-800 hover:bg-gray-100 hover:dark:bg-gray-700 flex justify-between">
      
      <div>
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
      </div>
      <div className=" right-4 bottom-4 ">
      <div className=" right-4 top-4 text-sm text-gray-500 dark:text-gray-300">
        {status_name}
      </div>
      <div>
        <label htmlFor={`interest-select-${id}`} className="text-sm text-gray-500 dark:text-gray-300 mb-1">
          Заинтересованность:
        </label>

        </div>
        <select 
          id={`interest-select-${id}`}
          className="bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 p-1 rounded" 
          onChange={(e) => onInterestChange(id, e.target.value)}
        >
          <option value="">Выберите...</option>
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </div>
    </article>
  );
};

export default OpenCard;