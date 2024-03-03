from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from .serializers import StudentSerializer, SupervisorSerializer, \
    DirectionSerializer, CourseSerializer, ProjectSerializer, \
    RolesSerializer
from Users.models import Student, Supervisor, Direction, Course, Roles
from Project.models import Project
from rest_framework.response import Response
from rest_framework.views import APIView


""" Для просмотра моделей"""


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


class CreateProjectView(APIView):
    def get(self, request):
        students = Student.objects.all()
        supervisors = Supervisor.objects.all()
        statuses = Roles.objects.all()
        students_serializer = StudentSerializer(students, many=True)
        supervisors_serializer = SupervisorSerializer(supervisors, many=True)
        statuses_serializer = RolesSerializer(statuses, many=True)
        data = {
            "students": students_serializer.data,
            "supervisors": supervisors_serializer.data,
            "roles": statuses_serializer.data
        }
        return Response(data)
