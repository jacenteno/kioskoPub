# ads/views.py
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Ad
from .serializers import AdSerializer

class AdViewSet(viewsets.ModelViewSet):
    """
    Un ViewSet para manejar las operaciones CRUD de anuncios.
    """
    serializer_class = AdSerializer
    queryset = Ad.objects.filter(is_active=True)  # Define el queryset aquí

    def list(self, request, *args, **kwargs):
        """
        Sobrescribe el método list para manejar el caso en el que no hay anuncios activos.
        """
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        if not queryset:
            return Response({"message": "No hay anuncios activos."}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """
        Sobrescribe el método create si necesitas lógica adicional al crear un anuncio.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
