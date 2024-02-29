from django.contrib import admin
from .models import Student, Supervisor, Direction, Course, StudentRole, Roles

admin.site.register(Roles)
admin.site.register(Direction)
admin.site.register(Course)


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('student_name', 'course', 'direction', 'email', 'role')


@admin.register(Supervisor)
class SupervisorAdmin(admin.ModelAdmin):
    list_display = ('supervisor_name', 'email', 'role')


@admin.register(StudentRole)
class StudentRoleAdmin(admin.ModelAdmin):
    list_display = ('student', 'role')
