# Generated by Django 3.2.8 on 2021-10-30 11:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('soil_health', '0002_auto_20211030_1103'),
    ]

    operations = [
        migrations.RenameField(
            model_name='soilhealth',
            old_name='phosphorus',
            new_name='phosphorous',
        ),
    ]
