from django.urls import path, include
from .routers import router
from .views import RegisterStudentView, CreateProjectView

urlpatterns = [
    path('', include(router.urls)),
    path('registration/', RegisterStudentView.as_view(), name='registration'),
    path('project-create/', CreateProjectView.as_view(), name='project-create'),
]
