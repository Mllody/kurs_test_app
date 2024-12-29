from rest_framework import serializers
from .models import CustomUser, Position

class UserSerializer(serializers.ModelSerializer):
    position = serializers.StringRelatedField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'position']
