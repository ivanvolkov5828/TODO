from django.db import models
from users_app.models import User
# Create your models here.


class Project(models.Model):
    name = models.CharField(max_length=100)
    link = models.URLField(blank=True)
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'| {self.user} | {self.project} | {self.text[:10]} |'
