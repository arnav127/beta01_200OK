# Generated by Django 3.2.8 on 2021-10-30 05:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('farmer', '0005_cropplantation_soil_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.CharField(max_length=40)),
            ],
        ),
        migrations.AlterField(
            model_name='crops',
            name='photo',
            field=models.ImageField(upload_to='images/crops/'),
        ),
    ]