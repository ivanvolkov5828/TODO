from rest_framework.viewsets import ModelViewSet
from project.models import Project, Todo
from project.serializers import ModelProjectSerializer, ModelTodoSerializer

# Create your views here.


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ModelProjectSerializer


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = ModelTodoSerializer
