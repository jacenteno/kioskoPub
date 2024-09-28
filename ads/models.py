from django.db import models
from django.core.exceptions import ValidationError

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name
    def ad_count(self):
        """Contar el número de anuncios asociados a esta categoría."""
        return self.ad_set.count()  # Devuelve el número de Ads relacionados


    class Meta:
        app_label = 'ads'
    

class Ad(models.Model):
    AD_TYPES = [
        ('video', 'Video'),
        ('image', 'Imagen')
    ]

    title = models.CharField(max_length=100)
    file = models.FileField(upload_to='ads/%Y/%m/%d/')  # Organiza por fecha
    ad_type = models.CharField(max_length=10, choices=AD_TYPES)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    duration = models.IntegerField(default=10, help_text="Duración en segundos")  # Valor por defecto de 10 segundos
    start_date = models.DateField()
    end_date = models.DateField()
    is_active = models.BooleanField(default=True)

    def clean(self):
        """Validar que la fecha de inicio sea anterior a la fecha de finalización."""
        if self.start_date >= self.end_date:
            raise ValidationError('La fecha de inicio debe ser anterior a la fecha de finalización.')

    def __str__(self):
        return self.title
