from django.urls import path
from . import views

app_name = 'app1'

urlpatterns = [
    path('', views.index, name="index"),
    path('api', views.search, name="api"),
]
