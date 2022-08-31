from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase
from users_app.models import User
from users_app.views import UserModelViewSet
from project.models import Project
from mixer.backend.django import mixer


# Create your tests here.


class TestUserModelViewSet(TestCase):
    # APIRequestFactory()
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/',
                               {'username': 'what', 'first_name': 'ivan_test', 'last_name': 'volkov_test',
                                'email': 'test1234@mail.ru'},
                               format='json')
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # APIClient
    def test_get_detail(self):
        user = User.objects.create_user(username='user_for_test', email='test@mail.ru', first_name='test_ivan',
                                        last_name='test_volkov')
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        user = mixer.blend(User)
        client = APIClient()

        response = client.put(f'/api/users/{user.id}/', {'username': 'Достоевский', 'first_name': 'Федор'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_edit_admin(self):
        client = APIClient()
        user = mixer.blend(User)
        admin = User.objects.create_superuser(username='volkov_admin',
                                              email='volkov@mail.ru',
                                              first_name='ivan',
                                              last_name='volkov',
                                              password='1234')
        client.force_authenticate(user=admin)

        response = client.put(f'/api/users/{user.id}/',
                              {'username': 'user_1', 'email': 'randommail_1@gmail.com', 'password': 'password'})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        client.logout()


# APITestCase + mixer
class TestProjectModelViewSet(APITestCase):
    def test_get_detail(self):
        project = mixer.blend(Project)
        response = self.client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
