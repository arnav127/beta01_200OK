from django.contrib import admin
from .models import City, ExtendUser

admin.site.register(ExtendUser)
admin.site.register(City)

