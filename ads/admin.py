from django.contrib import admin

# Register your models here.
from .models import Category, Ad

class AdAdmin(admin.ModelAdmin):
    list_display = ('title', 'id','ad_type', 'category', 'start_date', 'end_date', 'is_active')
    list_filter = ('ad_type', 'category', 'is_active')
    search_fields = ('title',)



class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'get_category_count')  # Agregamos el método

    def get_category_count(self, obj):
        return Category.objects.count()  # Cuenta el total de categorías

    get_category_count.short_description = 'Total de Categorías Creada'  # Nombre de la columna en la lista

admin.site.register(Category, CategoryAdmin)

admin.site.register(Ad, AdAdmin)

#admin.site.register(Category)
#admin.site.register(Ad)