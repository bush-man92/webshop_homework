# Generated by Django 3.0.2 on 2020-01-27 13:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webshopApp', '0002_auto_20200125_1226'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='item_quantity',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='item',
            name='price',
            field=models.IntegerField(default=0),
        ),
    ]