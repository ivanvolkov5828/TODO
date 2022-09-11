from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from project.models import Project, Todo
from project.serializers import ModelProjectSerializer, ModelTodoSerializer
from rest_framework.pagination import LimitOffsetPagination

# Create your views here.


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ModelProjectSerializer
    pagination_class = ProjectLimitOffsetPagination

    def get_queryset(self):
        queryset = Project.objects.all()
        name = self.request.query_params.get('name', None)
        if name:
            queryset = queryset.filter(name__contains=name)
        return queryset


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = ModelTodoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['project', 'created_at']

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     instance.is_active = False
    #     instance.save()

