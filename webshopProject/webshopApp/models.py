from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(
        unique=True,
        max_length=100
    )
    email = models.EmailField(
        unique=True
    )
    password = models.CharField(max_length=100)

class Item(models.Model):
    name = models.CharField(max_length=50)
    price = models.IntegerField(
        default = 0
    )
    about = models.TextField(blank=True)
    photo = models.ImageField(upload_to="img/photo")

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField(
        default = 0
    )

class Purchase(models.Model):
    HOME = "HOME"
    BANK = "BANK"
    PICK = "PICK"

    DELIVERY_CHOICES = [
        (HOME, "To your home"),
        (PICK, "To pickup address")
    ]

    PAYING_CHOICES = [
        (BANK, "Credit card"),
        (HOME, "Cash on delivery")
    ]

    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    address = models.CharField(max_length=100)
    total_price = models.IntegerField(
        default = 0
    )
    credit_card = models.CharField(
        max_length=30,
        default=""
    )
    security_number = models.IntegerField(
        default=0
    )
    paying = models.CharField(
        max_length=4,
        choices=PAYING_CHOICES,
        default=HOME
    )
    delivery = models.CharField(
        max_length=4,
        choices=DELIVERY_CHOICES,
        default=HOME
    )