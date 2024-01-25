from django.urls import path
from .import views
app_name='todo'
urlpatterns = [
    path('',views.home,name='home'),
    path('addTodo/',views.addTodo,name='addTodo'),
    path('displaytodo/',views.display,name='displaytodo'),
    path('delete_todo/<int:id>',views.delete_todo,name='delete_todo'),
    path('update/<int:id>',views.update,name='update')

    

]