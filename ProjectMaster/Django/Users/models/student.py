from django.db import models
from .users import Student
from .models import Roles


class StudentRole(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    role = models.ForeignKey(Roles, on_delete=models.CASCADE)
