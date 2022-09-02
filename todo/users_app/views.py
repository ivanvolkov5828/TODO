from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import ModelUserSerializer, NewModelUserSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
# Create your views here.


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = ModelUserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return NewModelUserSerializer
        return ModelUserSerializer
