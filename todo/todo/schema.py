from graphene import ObjectType, Schema, List, Field, Int
from graphene_django import DjangoObjectType
from users_app.models import User
from project.models import Project, Todo


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name')


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class Query(ObjectType):
    all_todos = List(TodoType)
    all_projects = List(ProjectType)
    all_users = List(UserType)

    user_by_project_id = Field(List(UserType), project_id=Int(required=True))

    def resolve_all_todos(root, info):
        return Todo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_user_by_project_id(self, info, project_id):
        return Project.objects.get(id=project_id).users.all()


schema = Schema(query=Query)

"""
Запрос в GraphQl
{

  allTodos{
    id
  }
  
  allProjects{
    id
    name
  }
  
  userByProjectId(projectId: 1){
    id
    username
    firstName
  }
}
"""

"""
Ответ в GraphQl
{
  "data": {
    "allTodos": [
      {
        "id": "1"
      }
    ],
    "allProjects": [
      {
        "id": "1",
        "name": "Todo"
      },
      {
        "id": "2",
        "name": "Todo#1"
      },
      {
        "id": "3",
        "name": "Todo#1"
      }
    ],
    "userByProjectId": [
      {
        "id": "1",
        "username": "volkov_admin",
        "firstName": "ivan1"
      }
    ]
  }
}
"""
