from rest_framework import serializers
from Users.models import User, Student, Supervisor, Roles, Direction, Course
from Project.models import Project, ProjectStatus


""" Из Users """


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'full_name', 'email', 'password', 'role']


class StudentSerializerGet(serializers.ModelSerializer):
    full_name = serializers.CharField(source='user.full_name', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    role = serializers.CharField(source='user.role', read_only=True)
    course = serializers.IntegerField(source='course.course_name')
    direction = serializers.CharField(source='direction.direction_name')

    class Meta:
        model = Student
        fields = ['id', 'full_name', 'email', 'role', 'course', 'direction']


class StudentSerializerPost(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


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
    status_name = serializers.CharField(source='status.status', read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'project_name', 'description', 'created_date', 'status', 'status_name', 'min_students_count', 'max_students_count']


class ProjectStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectStatus
        fields = '__all__'
