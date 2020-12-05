from django.urls import path
from . import views

app_name = 'story_8'

urlpatterns = [
    path('', views.index, name="index"),
    path('api', views.search, name="api"),
]
