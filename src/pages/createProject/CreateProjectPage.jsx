import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from '../../components/inputField/InputField';
import Dropdown from '../../components/dropDown/DropDown';
import SimpleTag from '../../components/tag/Tag';

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
    axios.get('http://127.0.0.1:8000/api/project-create/')
      .then(response => {
        setAllStudents(response.data.students);
        setAllCurators(response.data.supervisors);
        setAllRoles(response.data.roles);
      })
      .catch(error => console.error('Ошибка при загрузке данных:', error));
  }, []);

  const handleRemoveTag = (field, id) => {
    setProjectData(prevState => ({
      ...prevState,
      [field]: prevState[field].filter(itemId => itemId !== id)
    }));
  };

  const handleInputChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field, selectedIds) => {
    setProjectData(prevState => ({
      ...prevState,
      [field]: selectedIds
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/project-create/', projectData)
      .then(response => {
        console.log('Успешно отправлено:', response.data);
        // Дополнительная логика после отправки
      })
      .catch(error => console.error('Ошибка при отправке данных:', error));
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800">
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField label="Название проекта:" name="title" value={projectData.title} onChange={handleInputChange} />
        <InputField label="Описание проекта:" name="description" value={projectData.description} onChange={handleInputChange} />

        {/* Для студентов
        <Dropdown
          items={allStudents.map(student => ({ id: student.id, label: student.student_name }))}
          placeholder="Выберите студентов"
          selectedItems={projectData.students}
          onSelectionChange={selectedIds => handleSelectChange('students', selectedIds)}
          highlightColor="blue"
        />
        <div className="flex flex-wrap gap-2">
          {projectData.students.map(studentId => {
            const student = allStudents.find(s => s.id === studentId);
            return student && (
              <SimpleTag
                key={studentId}
                tagName={student.student_name}
                color="blue"
                onRemove={() => handleRemoveTag('students', studentId)}
              />
            );
          })}
        </div> */}

        {/* Для кураторов */}
        <Dropdown
          items={allCurators.map(curator => ({ id: curator.id, label: curator.name }))}
          placeholder="Выберите кураторов"
          selectedItems={projectData.curators}
          onSelectionChange={selectedIds => handleSelectChange('curators', selectedIds)}
          highlightColor="blue"
        />
        <div className="flex flex-wrap gap-2">
          {projectData.curators.map(curatorId => {
            const curator = allCurators.find(c => c.id === curatorId);
            return curator && (
              <SimpleTag
                key={curatorId}
                tagName={curator.name}
                color="blue"
                onRemove={() => handleRemoveTag('curators', curatorId)}
              />
            );
          })}
        </div>

        {/* Для ролей */}
        <Dropdown
          items={allRoles.map(role => ({ id: role.id, label: role.role_name }))}
          placeholder="Выберите роли"
          selectedItems={projectData.roles}
          onSelectionChange={selectedIds => handleSelectChange('roles', selectedIds)}
          highlightColor="blue"
        />
        <div className="flex flex-wrap gap-2">
          {projectData.roles.map(roleId => {
            const role = allRoles.find(r => r.id === roleId);
            return role && (
              <SimpleTag
                key={roleId}
                tagName={role.role_name}
                color="blue"
                onRemove={() => handleRemoveTag('roles', roleId)}
              />
            );
          })}
        </div>

        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Создать проект</button>
      </form>
    </div>
  );
};

export default CreateProjectPage;