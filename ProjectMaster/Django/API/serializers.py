from rest_framework import serializers
from Users.models import User, Student, Supervisor, Roles, Direction, Course
from Project.models import Project, ProjectStatus


""" Из Users """


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'full_name', 'email', 'password', 'role']


class StudentSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='user.full_name')
    email = serializers.EmailField(source='user.email')
    role = serializers.CharField(source='user.role')
    direction = serializers.CharField(source='direction.direction_name')

    class Meta:
        model = Student
        fields = ['id', 'full_name', 'email', 'role', 'course', 'direction']


class SupervisorSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='user.full_name')
    email = serializers.EmailField(source='user.email')
    role = serializers.CharField(source='user.role')

    class Meta:
        model = Supervisor
        fields = ['id', 'full_name', 'email', 'role', 'job']


class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = '__all__'


class DirectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direction
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


""" Из Projecct """


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ProjectStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectStatus
        fields = '__all__'
