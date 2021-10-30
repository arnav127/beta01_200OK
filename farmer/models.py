from django.db import models
from django.contrib.auth.models import AbstractUser

class ExtendUser(AbstractUser):

    email = models.EmailField(blank=False, max_length=255, verbose_name="email")

    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"
    
    phone_number = models.CharField(blank=False, max_length=20)
    city = models.CharField(max_length=40)
    state = models.CharField(max_length=40)

class City(models.Model):
    city = models.CharField(max_length=40)

    def __str__(self) -> str:
        return self.city