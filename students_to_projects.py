import numpy as np
import pandas as pd
import pulp

def assign_students_to_projects(num_students, num_projects, student_interests, student_roles, project_roles, min_students, max_students):
    model = pulp.LpProblem("Project_Assignment", pulp.LpMaximize)
    
    x = pulp.LpVariable.dicts("x", ((i, j) for i in range(num_students) for j in range(num_projects)), cat='Binary')
    model += pulp.lpSum([student_interests.iloc[i, j] * x[(i, j)] for i in range(num_students) for j in range(num_projects)])

    project_active = pulp.LpVariable.dicts("project_active", [j for j in range(num_projects)], cat='Binary')

    for j in range(num_projects):
        model += pulp.lpSum([x[(i, j)] for i in range(num_students)]) >= min_students * project_active[j]
        model += pulp.lpSum([x[(i, j)] for i in range(num_students)]) <= max_students * project_active[j]
        model += project_active[j] <= pulp.lpSum([x[(i, j)] for i in range(num_students)])

    for j in range(num_projects):
        for role in range(len(student_roles)): 
            required_role_count = np.count_nonzero(project_roles[f"Project_{j}"] == role)
            if required_role_count > 0:
                model += pulp.lpSum([x[(i, j)] for i in range(num_students) if role in student_roles[f"Student_{i}"]]) >= required_role_count * project_active[j]

    for i in range(num_students):
        model += pulp.lpSum([x[(i, j)] for j in range(num_projects)]) == 1

    model.solve()

    project_assignments = {f"Project_{j}": [] for j in range(num_projects)}
    for i in range(num_students):
        for j in range(num_projects):
            if x[i, j].varValue == 1: 
                project_assignments[f"Project_{j}"].append(f"Student_{i}")
    return project_assignments

num_students = 25
num_projects = 5

min_students = 5
max_students = 5

assignments = assign_students_to_projects(num_students, num_projects, student_interests, student_roles, project_roles, min_students, max_students)
print(assignments)