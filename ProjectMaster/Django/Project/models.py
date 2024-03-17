from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils import timezone
from Users.models import Supervisor, Student, Roles


class ProjectStatus(models.Model):
    status = models.CharField(max_length=100, blank=False, unique=True)

    def __str__(self):
        return self.status


class Project(models.Model):
    project_name = models.CharField(max_length=255, blank=False)
    description = models.TextField(blank=True)
    created_date = models.DateTimeField(default=timezone.now)
    status = models.ForeignKey(ProjectStatus, on_delete=models.CASCADE, blank=True)
    min_students_count = models.IntegerField(
        blank=False,
        validators=[MinValueValidator(0)],
        default=0  # Не давал произвести миграцию без значения по-умолчанию
    )
    max_students_count = models.IntegerField(
        blank=False,
        validators=[MinValueValidator(1)],
        default=1  # Не давал произвести миграцию без значения по-умолчанию
    )

    def clean(self):
        if self.min_students_count > self.max_students_count:
            raise ValidationError("Минимальное количество студентов не может быть больше максимального.")

    def __str__(self):
        return self.project_name


class Documentation(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, blank=False)
    link = models.URLField(blank=False)

    def __str__(self):
        return f'Документация по проекту {self.project.name}'


class ProjectSupervisor(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, blank=False)
    supervisor = models.ForeignKey(Supervisor, on_delete=models.CASCADE, blank=False)


class ProjectStudent(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, blank=False)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, blank=False)
    interest = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(5)],
        null=True,
        blank=True
    )


class ProjectRole(models.Model):
    project = models.ForeignKey('Project', on_delete=models.CASCADE)
    role = models.ForeignKey(Roles, on_delete=models.CASCADE)


class Feedback(models.Model):
    project = models.ForeignKey('Project', on_delete=models.CASCADE)
    sender = models.ForeignKey(Supervisor, on_delete=models.DO_NOTHING)
    timestamp = models.DateTimeField(auto_now_add=True)
    content = models.TextField(verbose_name='Текст сообщения', blank=False)