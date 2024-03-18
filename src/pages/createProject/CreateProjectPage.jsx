import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from '../../components/inputField/InputField';
import Dropdown from '../../components/dropDown/DropDown';
import SimpleTag from '../../components/tag/Tag';
import MultiSelectDropdown from '../../components/dropDown/MultiSelectDropDown';

const CreateProjectPage = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const [projectData, setProjectData] = useState({
    project_name: '',
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

  const handleRemoveЬMultyTag = (field, index) => {
    setProjectData(prevState => ({
      ...prevState,
      [field]: prevState[field].filter((_, i) => i !== index)
    }));
  };

  const handleRemoveTag = (field, id) => {
    setProjectData(prevState => ({
      ...prevState,
      [field]: prevState[field].filter(item => item !== id)
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
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const config = {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Refresh-Token': refreshToken
      }
    };

    axios.post('http://127.0.0.1:8000/api/project-create/', projectData, config)
      .then(response => {
        console.log('Успешно отправлено:', response.data);
        // Дополнительная логика после отправки
      })
      .catch(error => console.error('Ошибка при отправке данных:', error));
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800">
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField label="Название проекта:" name="project_name" value={projectData.project_name} onChange={handleInputChange} />
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
      <InputField 
        label="Максимальное количество студентов:" 
        name="max_students_count" 
        value={projectData.max_students_count} 
        onChange={handleInputChange} 
      />
      <InputField 
        label="Минимальное количество студентов:" 
        name="min_students_count" 
        value={projectData.min_students_count} 
        onChange={handleInputChange} 
      />
        {/* Для кураторов */}
        <Dropdown
          items={allCurators.map(curator => ({ id: curator.id, label: curator.full_name }))}
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
                tagName={curator.full_name}
                color="blue"
                onRemove={() => handleRemoveTag('curators', curatorId)}
              />
            );
          })}
        </div>
        <MultiSelectDropdown
          items={allRoles.map(role => ({ id: role.id, label: role.role_name }))}
          placeholder="Выберите роли"
          selectedItems={projectData.roles}
          onSelectionChange={selectedIds => handleSelectChange('roles', selectedIds)}
        />

        {/* Display selected roles */}
        <div className="flex flex-wrap gap-2">
  {projectData.roles.map((roleId, index) => {
    const role = allRoles.find(r => r.id === roleId);
    return role && (
      <SimpleTag
        key={index}
        tagName={role.role_name}
        color="blue"
        onRemove={() => handleRemoveЬMultyTag('roles', index)}
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