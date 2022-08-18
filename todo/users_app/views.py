from rest_framework.viewsets import GenericViewSet
from .models import User
from .serializers import ModelUserSerializer
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin

# Create your views here.


class UserModelViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = ModelUserSerializer
