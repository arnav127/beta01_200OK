from django.db import models
from django.db.models.deletion import CASCADE
from farmer.models import ExtendUser

class SoilHealth(models.Model):
    owner = models.ForeignKey(ExtendUser, on_delete=CASCADE)
    ph = models.FloatField(blank=False)
    nitrogen = models.FloatField(blank=False)
    phosphorous = models.FloatField(blank=False)
    potas = models.FloatField(blank=False)
    temp = models.FloatField(blank=False)
    rainfall = models.FloatField(blank=False)

    def __str__(self):
        return self.owner.username + " - " + self.soil_type
