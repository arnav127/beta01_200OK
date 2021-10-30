from django.db import models


class Crops(models.Model):

    name = models.CharField(blank=False, max_length=40)
    season = models.CharField(blank=False, max_length=40)
    photo = models.ImageField(upload_to='static/images/crops/')
    about = models.TextField()
    msrp = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.name
  