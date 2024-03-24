from django.contrib import admin
from .models import ProjectStatus, Project, Documentation, ProjectSupervisor, ProjectStudent, ProjectRole

admin.site.register(ProjectStatus)
admin.site.register(Documentation)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('project_name', 'created_date', 'status')


@admin.register(ProjectStudent)
class ProjectStudentAdmin(admin.ModelAdmin):
    list_display = ('project', 'student', 'interest', 'participation')


@admin.register(ProjectSupervisor)
class ProjectSupervisorAdmin(admin.ModelAdmin):
    list_display = ('project', 'supervisor')


@admin.register(ProjectRole)
class ProjectRoleAdmin(admin.ModelAdmin):
    list_display = ('project', 'role')

