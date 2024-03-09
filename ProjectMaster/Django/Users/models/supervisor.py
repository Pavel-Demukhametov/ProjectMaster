from django.db import models
from .models import Role
from django.utils.translation import gettext_lazy as _


class Supervisor(models.Model):
    supervisor_name = models.CharField(max_length=255, blank=False)
    email = models.EmailField(_("email address"), unique=True)
    password = models.CharField(max_length=255)
    role = Role.SUPERVISOR

    def __str__(self):
        return str(self.supervisor_name)
