# Generated by Django 5.0.2 on 2024-03-16 10:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Project', '0001_initial'),
        ('Users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedback',
            name='sender',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='Users.supervisor'),
        ),
        migrations.AddField(
            model_name='feedback',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Project.project'),
        ),
        migrations.AddField(
            model_name='documentation',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Project.project'),
        ),
        migrations.AddField(
            model_name='projectrole',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Project.project'),
        ),
        migrations.AddField(
            model_name='projectrole',
            name='role',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Users.roles'),
        ),
        migrations.AddField(
            model_name='project',
            name='status',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='Project.projectstatus'),
        ),
        migrations.AddField(
            model_name='projectstudent',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Project.project'),
        ),
        migrations.AddField(
            model_name='projectstudent',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Users.student'),
        ),
        migrations.AddField(
            model_name='projectsupervisor',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Project.project'),
        ),
        migrations.AddField(
            model_name='projectsupervisor',
            name='supervisor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Users.supervisor'),
        ),
    ]
