from django.contrib import admin
from .models import SoilHealth

@admin.register(SoilHealth)
class SoilHealthAdmin(admin.ModelAdmin):
    pass