from django.core.management import BaseCommand
from users_app.models import User

# from django.utils.crypto import get_random_string

const = 2


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.create_superuser(username='volkov_admin',
                                      email='volkov@mail.ru',
                                      first_name='ivan',
                                      last_name='volkov',
                                      password='1234')
        for _ in range(const):
            User.objects.create_user(username='user' + f'{_}',
                                     email=f'{_}' + '@mail.ru',
                                     first_name='boy' + f'{_}',
                                     last_name='girl' + f'{_}')