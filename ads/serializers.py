# ads/serializers.py
from rest_framework import serializers
from .models import Ad

class AdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ad
        fields = ['id','title', 'file', 'ad_type', 'duration', 'category', 'start_date', 'end_date']

    def to_representation(self, instance):
        """Filtra los anuncios para devolver solo aquellos que están activos."""
        representation = super().to_representation(instance)
        if not instance.is_active:
            return None  # No incluir anuncios inactivos
        return representation
