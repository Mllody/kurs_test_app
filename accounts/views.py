from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import status
from .models import CustomUser, Position
from .serializers import UserSerializer
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

class CreateUserView(APIView):
    permission_classes = [IsAdminUser]  # Tylko administrator

    def post(self, request):
        data = request.data
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        position_id = data.get("position_id")

        if not username or not email or not password or not position_id:
            return Response({"error": "Wszystkie pola są wymagane."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            position = Position.objects.get(id=position_id)
            user = CustomUser.objects.create_user(
                username=username,
                email=email,
                password=password,
                position=position
            )
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        except Position.DoesNotExist:
            return Response({"error": "Stanowisko nie istnieje."}, status=status.HTTP_400_BAD_REQUEST)


class TrainingListView(APIView):
    permission_classes = [IsAuthenticated]  # Tylko zalogowani użytkownicy

    def get(self, request):
        user = request.user
        trainings = []

        # Przyjmujemy, że Position zawiera pole 'trainings' (ManyToManyField do modelu Training)
        if user.position:
            trainings = list(user.position.trainings.values_list('name', flat=True))

        return Response({
            "trainings": trainings,
            "is_admin": user.is_staff,  # Informacja, czy użytkownik jest administratorem
        })


@csrf_exempt  # Wyłącza wymóg CSRF dla logowania (tylko w przypadku POST)
def custom_login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({"message": "Zalogowano pomyślnie"})
            else:
                return JsonResponse({"error": "Niepoprawne dane logowania"}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Nieprawidłowy format danych JSON"}, status=400)
    return JsonResponse({"error": "Metoda nieobsługiwana"}, status=405)