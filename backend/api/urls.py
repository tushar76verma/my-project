from django.urls import path
from .views import login, summary, chart, table

urlpatterns = [
    path('login/', login),
    path('summary/', summary),
    path('chart/', chart),
    path('table/', table),
]
