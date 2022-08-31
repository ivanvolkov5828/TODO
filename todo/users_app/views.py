from rest_framework.viewsets import GenericViewSet
from .models import User
from .serializers import ModelUserSerializer
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin
from rest_framework.permissions import IsAuthenticatedOrReadOnly
# Create your views here.


class UserModelViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin):
    queryset = User.objects.all()
    serializer_class = ModelUserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
