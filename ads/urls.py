from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdViewSet

# Definir el enrutador para las vistas basadas en ViewSet
router = DefaultRouter()
router.register(r'ads', AdViewSet)

# URLs específicas de la aplicación 'ads'
urlpatterns = [
    path('', include(router.urls)),
]


