from rest_framework.serializers import ModelSerializer
from .models import User


class ModelUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')


class NewModelUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'is_superuser', 'is_staff')
