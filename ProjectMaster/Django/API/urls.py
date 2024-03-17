from django.urls import path, include
from .routers import router
from .views import RegisterStudentView, CreateProjectView
from Users.views import CustomUserAuthentication
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('', include(router.urls)),
    path('auth/login', CustomUserAuthentication.as_view(), name='custom_user_login'),
    path('auth/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('registration/', RegisterStudentView.as_view(), name='registration'),
    path('project-create/', CreateProjectView.as_view(), name='project-create'),
]
