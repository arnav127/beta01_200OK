from django.contrib import admin
from .models import ExtendUser, Crops, CropPlantation
# Register your models here.
admin.site.register(ExtendUser)
admin.site.register(Crops)
admin.site.register(CropPlantation)