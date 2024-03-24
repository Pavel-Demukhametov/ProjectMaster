from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import User
from API.serializers import UserSerializer


class CustomUserAuthentication(APIView):
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Проверка наличия пользователя в студентах
        try:
            user = User.objects.get(email=email)
            if user.password == password:
                serializer = UserSerializer(user)
                refresh = RefreshToken.for_user(user)
                return Response({
                    'user': serializer.data,
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                })
        except User.DoesNotExist:
            pass

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
