from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from .models import Direction, Course


class Role(models.TextChoices):
    """Роли пользователей"""
    STUDENT = 'STUDENT', 'Студент'
    SUPERVISOR = 'SUPERVISOR', 'Куратор'
    ADMINISTRATOR = 'ADMINISTRATOR', 'Администратор'


class User(AbstractUser):
    username = None

    full_name = models.CharField(
        verbose_name='ФИО',
        max_length=255,
        blank=False
    )

    email = models.EmailField(
        _("email address"),
        unique=True
    )

    password = models.CharField(
        verbose_name='Пароль',
        max_length=255,
        blank=False
    )

    role = models.CharField(
        max_length=15,
        choices=Role.choices,
        verbose_name='Роль пользователя',
        default=Role.STUDENT
    )

    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class Student(models.Model):
    user = models.OneToOneField(
        User,
        verbose_name='Пользователь',
        on_delete=models.CASCADE
    )

    course = models.ForeignKey(
        Course,
        verbose_name='Курс обучения',
        on_delete=models.CASCADE,
        blank=False
    )

    direction = models.ForeignKey(
        Direction,
        verbose_name='Направление обучения',
        on_delete=models.CASCADE,
        blank=False
    )

    class Meta:
        db_table = 'student'
        ordering = ('user',)
        verbose_name = 'Студент'
        verbose_name_plural = 'Студенты'

    def __str__(self):
        return self.user.full_name


class Supervisor(models.Model):
    user = models.OneToOneField(
        User,
        verbose_name='Пользователь',
        on_delete=models.CASCADE,
    )
    job = models.CharField(
        max_length=255,
        verbose_name='Место работы',
        blank=True
    )

    class Meta:
        db_table = 'supervisor'
        ordering = ('user',)
        verbose_name = 'Куратор'
        verbose_name_plural = 'Кураторы'

    def __str__(self):
        return self.user.full_name