import React, { useState } from 'react';
import Dropdown from '../../components/dropDown/DropDown';
import SimpleTag from '../../components/tag/Tag';

const StudentCard = ({ student, roles }) => {
    const [selectedRoleIds, setSelectedRoleIds] = useState([]);

    const handleSelectChange = (selectedIds) => {
        setSelectedRoleIds(selectedIds);
    };

    const handleRemoveRole = (roleId) => {
        setSelectedRoleIds(selectedRoleIds.filter(id => id !== roleId));
    };

    // Получение полных объектов ролей для отображения в тегах
    const selectedRoles = roles.filter(role => selectedRoleIds.includes(role.id));

    return (
        <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-4 flex flex-col md:flex-row justify-between">
            <div>
                <h3 className="text-lg font-semibold dark:text-white">{student.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{student.course}</p>
            </div>
            <div>
                <Dropdown
                    items={roles.map(role => ({ id: role.id, label: role.label }))}
                    placeholder="Выберите роли"
                    selectedItems={selectedRoleIds}
                    onSelectionChange={handleSelectChange}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                    {selectedRoles.map((role) => (
                        <SimpleTag
                            key={role.id}
                            tagName={role.label}
                            color="blue"
                            onRemove={() => handleRemoveRole(role.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentCard;