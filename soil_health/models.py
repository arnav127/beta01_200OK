from django.db import models
from django.db.models.deletion import CASCADE
from farmer.models import ExtendUser

class SoilHealth(models.Model):
    owner = models.ForeignKey(ExtendUser, on_delete=CASCADE)
    soil_type = models.CharField(blank=False, max_length=40)
    soil_ph = models.FloatField(blank=False)
    nitrogen = models.FloatField(blank=False)
    phosphorus = models.FloatField(blank=False)
    potassium = models.FloatField(blank=False)

    def __str__(self):
        return self.owner.username + " - " + self.soil_type
