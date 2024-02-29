from django.db import models
from .models import Direction, Course, Role, Roles
from django.utils.translation import gettext_lazy as _


class Student(models.Model):
    student_name = models.CharField(max_length=255, blank=False)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, blank=False)
    direction = models.ForeignKey(Direction, on_delete=models.CASCADE, blank=False)
    email = models.EmailField(_("email address"), unique=True)
    password = models.CharField(max_length=255)
    role = Role.STUDENT

    def __str__(self):
        return str(self.student_name)


class StudentRole(models.Model):
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    role = models.ForeignKey(Roles, on_delete=models.CASCADE)
