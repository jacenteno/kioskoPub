from django.test import TestCase
from .models import Ad, Category

class AdModelTest(TestCase):
    def setUp(self):
        # Crea una categoría 'Pasillos'
        self.category = Category.objects.create(name='Pasillos')

    def test_ad_creation(self):
        # Crea un anuncio
        ad = Ad.objects.create(
            title='Anuncio de prueba',
            file='ruta/a/tu/archivo.mp4',  # Reemplaza esto con un archivo de prueba válido
            ad_type='video',
            category=self.category,  # Usando la categoría 'Pasillos'
            duration=30,
            start_date='2024-01-01',
            end_date='2024-01-31',
            is_active=True
        )

        # Comprueba que el anuncio se creó correctamente
        self.assertIsInstance(ad, Ad)
        self.assertEqual(ad.title, 'Anuncio de prueba')
        self.assertEqual(ad.category.name, 'Pasillos')  # Verifica que la categoría sea correcta
        self.assertEqual(ad.duration, 30)  # Verifica que la duración sea 30 segundos
        self.assertTrue(ad.is_active)  # Verifica que el anuncio esté activo
