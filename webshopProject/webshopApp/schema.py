from graphene_django import DjangoObjectType
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from graphene import relay
import graphene

from .models import User, Item, Cart, Purchase

class UserType(DjangoObjectType):
    class Meta:
        model = User
        exclude = ("password",)

class ItemType(DjangoObjectType):
    class Meta:
        model = Item

class CartType(DjangoObjectType):
    class Meta:
        model = Cart
        fields = ("item", "quantity", "id")
    
class PurchaseType(DjangoObjectType):
    class Meta:
        model = Purchase
        fields = ("user",)

class RegisterMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required = True)
        password = graphene.String(required = True)
        email = graphene.String(required = True)

    user = graphene.Field(UserType)

    def mutate(self, info, username, password, email):
        try:
            user = User.objects.get(username = username)
            return RegisterMutation("Username already exists")
        except:
            try:
                user = User.objects.get(email = email)
                return RegisterMutation("Email already exists") 
            except:
                hashed_password = make_password(password=password, salt=None, hasher='bcrypt_sha256')
                user = User.objects.create(username = username, password = hashed_password, email = email)
                return RegisterMutation(user = user)

class LoginMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required = True)
        password = graphene.String(required = True)

    user = graphene.Field(UserType)

    def mutate(self, info, username, password):
        user = None
        try:
            user = User.objects.get(username = username)
        except:
            return LoginMutation("No username")
        if user != None:
            password_validation = check_password(password, user.password)
            if password_validation == True:
                return LoginMutation(user = user)
            else:
                user.username = "Wrong password"
                return LoginMutation(user = user)

class AddToCartMutation(graphene.Mutation):
    class Arguments:
        user_id = graphene.Int(required = True)
        item_id = graphene.Int(required = True)
        modifier = graphene.String(required = True)

    cart = graphene.Field(CartType)

    def mutate(self, info, user_id, item_id, modifier):
        cart = Cart.objects.filter(user_id = user_id, item_id = item_id)
        for item in cart:
            if item != []:
                if item.quantity == 0:
                    cart = Cart.objects.destroy(user_id = user_id, item_id = item_id)
                if modifier == "+":
                    cart = Cart.objects.update(user_id = user_id, item_id = item_id, quantity = item.quantity + 1)
                elif modifier == "-":
                    cart = Cart.objects.update(user_id = user_id, item_id = item_id, quantity = item.quantity - 1)
            else:
                cart = Cart.objects.create(user_id = user_id, item_id = item_id, quantity = 1)
        return AddToCartMutation(cart = cart)

class CreatePurchaseMutation(graphene.Mutation):
    class Arguments:
        address = graphene.String(required = True)
        credit_cart = graphene.String()
        security_number = graphene.String()
        paying = graphene.String(required = True)
        delivery = graphene.String(required = True)
        user_id = graphene.Int(required = True)

    purchase = graphene.Field(PurchaseType)

    def mutate(self, info, user_id, delivery, paying, security_number, credit_cart, address):
        cart = Cart.objects.filter(user_id = user_id)
        total_price = 0
        for items in cart:
            total_price += items.price * items.item_quantity
        purchase = Purchase.objects.create(user_id = user_id, delivery = delivery, security_number = security_number,
            credit_cart = credit_cart, address = address, total_price = total_price)
        return CreatePurchaseMutation(purchase = purchase)

class Query(graphene.ObjectType):
    items = graphene.List(ItemType)
    item = graphene.Field(ItemType, id = graphene.Int())
    cart = graphene.List(CartType, user_id = graphene.Int())
    purchase = graphene.Field(PurchaseType, id = graphene.Int())

    def resolve_items(self, info):
        return Item.objects.all()

    def resolve_item(self, info, id):
        return Item.objects.get(id = id)

    def resolve_cart(self, info, user_id):
        return Cart.objects.filter(user_id = user_id)

    def resolve_purchase(self, info, id):
        return Purchase.objects.filter(id = id)

class Mutation(graphene.ObjectType):
    registration = RegisterMutation.Field()
    login = LoginMutation.Field()
    addToCart = AddToCartMutation.Field()
    createPurchase = CreatePurchaseMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)