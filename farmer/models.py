from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.deletion import CASCADE

# Create your models here.
class ExtendUser(AbstractUser):

    email = models.EmailField(blank=False, max_length=255, verbose_name="email")

    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"
    
    phone_number = models.CharField(blank=False, max_length=20)
    city = models.CharField(max_length=40)
    state = models.CharField(max_length=40)

    

class Crops(models.Model):

    name = models.CharField(blank=False, max_length=40)
    season = models.CharField(blank=False, max_length=40)
    photo = models.ImageField()
    about = models.TextField()
    
class CropPlantation(models.Model):
    crop = models.ForeignKey(Crops, on_delete=CASCADE)
    farmer = models.ForeignKey(ExtendUser, on_delete=CASCADE)
    planted_date = models.DateField()
    harvested_date = models.DateField()
