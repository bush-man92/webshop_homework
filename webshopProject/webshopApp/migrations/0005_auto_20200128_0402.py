# Generated by Django 3.0.2 on 2020-01-28 03:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('webshopApp', '0004_auto_20200127_1744'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cart',
            old_name='item_quantity',
            new_name='quantity',
        ),
    ]