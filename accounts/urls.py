from django.urls import path
from .views import custom_login_view, TrainingListView, CreateUserView  # Import widoków

urlpatterns = [
    path("login/", custom_login_view, name="custom_login"),  # Ścieżka logowania użytkownika
    path("trainings/", TrainingListView.as_view(), name="training_list"),  # Ścieżka do pobrania szkoleń użytkownika
    path("create-user/", CreateUserView.as_view(), name="create_user"),  # Ścieżka do tworzenia nowych użytkowników
]
