from django.db import models


class Role(models.TextChoices):
    """Роли пользователей"""
    STUDENT = 'STUDENT', 'Студент'
    SUPERVISOR = 'SUPERVISOR', 'Куратор'


class Roles(models.Model):
    """Роли для студентов и проектов"""
    role_name = models.CharField(max_length=100)

    def __str__(self):
        return self.role_name


class Direction(models.Model):
    """Направление обучения"""
    direction_name = models.CharField(max_length=100, unique=True, blank=False)

    def __str__(self):
        return str(self.direction_name)


class Course(models.Model):
    """Курс обучения"""
    course_name = models.PositiveSmallIntegerField(unique=True, blank=False)

    def __str__(self):
        return str(self.course_name)

