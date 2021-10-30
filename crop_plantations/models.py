from django.db import models
from django.db.models.deletion import CASCADE
from farmer.models import ExtendUser
from crops.models import Crops
from soil_health.models import SoilHealth

class CropPlantation(models.Model):
    crop = models.ForeignKey(Crops, on_delete=CASCADE)
    farmer = models.ForeignKey(ExtendUser, on_delete=CASCADE)
    soil_type = models.ForeignKey(SoilHealth, on_delete=CASCADE, blank=True, null=True)
    planted_date = models.DateField()
    harvested_date = models.DateField(blank=True, null=True)


    def __str__(self):
        return self.crop.name + " - " + self.farmer.username

