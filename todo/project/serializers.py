from rest_framework.serializers import ModelSerializer
from project.models import Project, Todo


class ModelProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ModelTodoSerializer(ModelSerializer):
    class Meta:
        model = Todo
        exclude = ('is_active',)

