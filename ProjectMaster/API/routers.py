from rest_framework import routers
from .views import StudentViewSet, SupervisorViewSet, ProjectsViewSet

router = routers.DefaultRouter()
router.register(r'students', StudentViewSet, basename='students')
router.register(r'supervisors', SupervisorViewSet, basename='supervisors')
router.register(r'projects', ProjectsViewSet, basename='projects')
