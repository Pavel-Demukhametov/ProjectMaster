from django.contrib import admin
from .models import User, Student, Supervisor, Direction, Course, StudentRole, Roles
from django.contrib.auth.admin import UserAdmin


@admin.register(StudentRole)
class StudentRoleAdmin(admin.ModelAdmin):
    list_display = ('student', 'role')


class ProfileUserAdmin(UserAdmin):
    # Определение полей, которые будут отображаться в списке пользователей
    list_display = ('full_name', 'email', 'role', 'is_superuser')

    # Определение полей, которые будут отображаться на странице редактирования пользователя
    fieldsets = (
        (None, {'fields': ('full_name', 'email', 'password', 'role', 'is_superuser')}),
    )

    # Определение полей, которые будут отображаться на странице добавления нового пользователя
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('full_name', 'email', 'password1', 'password2', 'role', 'is_superuser')}
        ),
    )
    # Указываем поле email для сортировки
    ordering = ('email',)


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'direction')
    search_fields = ('course', 'direction', 'user')


@admin.register(Supervisor)
class SupervisorAdmin(admin.ModelAdmin):
    list_display = ('user', 'job')
    search_fields = ('job', 'user')


admin.site.register(User, ProfileUserAdmin)
admin.site.register(Roles)
admin.site.register(Direction)
admin.site.register(Course)

