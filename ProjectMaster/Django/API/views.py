from django.shortcuts import get_object_or_404
from rest_framework import mixins, status
from rest_framework.viewsets import GenericViewSet
from .serializers import StudentSerializer, SupervisorSerializer, \
    DirectionSerializer, CourseSerializer, ProjectSerializer, \
    RolesSerializer, ProjectStatusSerializer, UserSerializer
from Users.models import User, Student, Supervisor, Direction, Course, Roles
from Project.models import Project, ProjectStatus, ProjectStudent, ProjectSupervisor, \
    ProjectRole
from rest_framework.response import Response
from rest_framework.views import APIView


""" Для просмотра моделей"""


class UsersViewSet(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   mixins.ListModelMixin,
                   GenericViewSet):
    """ Отображение пользователей для API и работа с ними """
    serializer_class = UserSerializer

    def get_queryset(self):
        pk = self.kwargs.get("pk")

        if not pk:
            return User.objects.all()

        return User.objects.filter(pk=pk)


class StudentViewSet(mixins.CreateModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.DestroyModelMixin,
                     mixins.ListModelMixin,
                     GenericViewSet):
    """ Отображение студентов для API и работа с ними """
    serializer_class = StudentSerializer

    def get_queryset(self):
        pk = self.kwargs.get("pk")

        if not pk:
            return Student.objects.all()

        return Student.objects.filter(pk=pk)


class SupervisorViewSet(mixins.CreateModelMixin,
                        mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin,
                        mixins.DestroyModelMixin,
                        mixins.ListModelMixin,
                        GenericViewSet):
    """ Отображение кураторов для API и работа с ними """
    serializer_class = SupervisorSerializer

    def get_queryset(self):
        pk = self.kwargs.get("pk")

        if not pk:
            return Supervisor.objects.all()

        return Supervisor.objects.filter(pk=pk)


class ProjectsViewSet(mixins.CreateModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.DestroyModelMixin,
                      mixins.ListModelMixin,
                      GenericViewSet):
    """ Отображение проектов для API и работа с ними """
    serializer_class = ProjectSerializer

    def get_queryset(self):
        pk = self.kwargs.get("pk")

        if not pk:
            return Project.objects.all()

        return Project.objects.filter(pk=pk)


""" Для страниц"""


class RegisterStudentView(APIView):
    def get(self, request):
        directions = Direction.objects.all()
        courses = Course.objects.all()

        directions_serializer = DirectionSerializer(directions, many=True)
        courses_serializer = CourseSerializer(courses, many=True)

        data = {
            "directions": directions_serializer.data,
            "courses": courses_serializer.data
        }
        return Response(data)

    def post(self, request):
        # Проверка данных пользователя
        user_serializer = UserSerializer(data=request.data)
        if not user_serializer.is_valid():
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Проверка уникальности email
        email = request.data.get('email')
        if User.objects.filter(email=email).exists():
            return Response({"error": "Пользователь с таким email уже зарегистрирован."}, status=status.HTTP_400_BAD_REQUEST)

        # Создание пользователя
        user = user_serializer.save()

        # Проверка данных студента
        data = request.data.copy()
        data['user'] = user.id  # Добавляем id пользователя в данные студента

        student_serializer = StudentSerializer(data=data)
        if not student_serializer.is_valid():
            user.delete()  # Удаляем пользователя, если данные студента неверны
            return Response(student_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Проверка уникальности студента
        if Student.objects.filter(user=user).exists():
            user.delete()  # Удаляем пользователя, если студент с таким пользователем уже существует
            return Response({"error": "Студент с таким пользователем уже зарегистрирован."}, status=status.HTTP_400_BAD_REQUEST)

        # Создание студента
        student_serializer.save()
        return Response(student_serializer.data, status=status.HTTP_201_CREATED)


class CreateProjectView(APIView):
    def get(self, request):
        students = Student.objects.all()
        supervisors = Supervisor.objects.all()
        roles = Roles.objects.all()
        statuses = ProjectStatus.objects.all()

        students_serializer = StudentSerializer(students, many=True)
        supervisors_serializer = SupervisorSerializer(supervisors, many=True)
        roles_serializer = RolesSerializer(roles, many=True)
        statuses_serializer = ProjectStatusSerializer(statuses, many=True)

        data = {
            "students": students_serializer.data,
            "supervisors": supervisors_serializer.data,
            "roles": roles_serializer.data,
            "statuses": statuses_serializer.data
        }
        return Response(data)

    def post(self, request):
        # Проверяем, является ли текущий пользователь суперпользователем или куратором
        if request.user.is_authenticated:
            if request.user.role == "STUDENT":
                return Response({'error': 'Доступ запрещен'}, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({'error': 'Доступ запрещен'}, status=status.HTTP_403_FORBIDDEN)

        # Проверяем данные проекта
        project_serializer = ProjectSerializer(data=request.data)
        if not project_serializer.is_valid():
            return Response(project_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Проверяем существование студентов, кураторов и ролей
        students_ids = request.data.get('students', [])
        supervisors_ids = request.data.get('curators', [])
        roles_ids = request.data.get('roles', [])

        for student_id in students_ids:
            get_object_or_404(Student, pk=student_id)

        for supervisor_id in supervisors_ids:
            get_object_or_404(Supervisor, pk=supervisor_id)

        for role_id in roles_ids:
            get_object_or_404(Roles, pk=role_id)

        # Создаем объект проекта
        project_data = project_serializer.validated_data
        project_data['status'] = ProjectStatus.objects.first()
        project = Project.objects.create(**project_data)

        # Создаем объекты ProjectStudent для студентов (если список не пуст)
        if students_ids:
            for student_id in students_ids:
                ProjectStudent.objects.create(project=project, student_id=student_id)

        # Создаем объекты ProjectSupervisor для кураторов (если список не пуст)
        if supervisors_ids:
            for supervisor_id in supervisors_ids:
                ProjectSupervisor.objects.create(project=project, supervisor_id=supervisor_id)

        # Создаем объекты ProjectRole для ролей (если список не пуст)
        if roles_ids:
            for role_id in roles_ids:
                ProjectRole.objects.create(project=project, role_id=role_id)

        return Response(ProjectSerializer(project).data, status=status.HTTP_201_CREATED)
