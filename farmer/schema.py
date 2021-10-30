import graphene

from graphene_django import DjangoObjectType
from graphql_auth.schema import UserQuery, MeQuery
from graphql_auth import mutations

from core.settings import BASE_DIR
from .models import ExtendUser, City
from graphql_jwt.decorators import login_required

import requests

class UserType(DjangoObjectType):
    class Meta:
        model = ExtendUser

class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()
    verify_account = mutations.VerifyAccount.Field()
    resend_activation_email = mutations.ResendActivationEmail.Field()
    send_password_reset_email = mutations.SendPasswordResetEmail.Field()
    password_reset = mutations.PasswordReset.Field()
    password_change = mutations.PasswordChange.Field()
    archive_account = mutations.ArchiveAccount.Field()
    delete_account = mutations.DeleteAccount.Field()
    update_account = mutations.UpdateAccount.Field()
    send_secondary_email_activation = mutations.SendSecondaryEmailActivation.Field()
    verify_secondary_email = mutations.VerifySecondaryEmail.Field()
    swap_emails = mutations.SwapEmails.Field()

    # django-graphql-jwt inheritances
    token_auth = mutations.ObtainJSONWebToken.Field()
    verify_token = mutations.VerifyToken.Field()
    refresh_token = mutations.RefreshToken.Field()
    revoke_token = mutations.RevokeToken.Field()

class AuthQuery(UserQuery, MeQuery, graphene.ObjectType):
    pass


class CityType(DjangoObjectType):
    class Meta:
        model = City
class CityQuery(graphene.ObjectType):
    all_cities = graphene.List(CityType)

    def resolve_all_cities(root, info):
        return City.objects.all()



class SendCropRecommendation(graphene.Mutation):
    class Arguments:
        crops = graphene.List(graphene.String)

    ok = graphene.Boolean()

    @classmethod
    def mutate(self, info, name, **kwargs):
        ok = True
        # broadcast here
        return SendCropRecommendation(ok=ok)


class FarmerMutation(graphene.ObjectType):
    send_crop_recommendation = SendCropRecommendation.Field()
    

class WeatherQuery(graphene.ObjectType):
    get_weather = graphene.Field(graphene.JSONString, city=graphene.String())

    def resolve_get_weather(self, info, city):
        from core.settings import WEATHER_API_KEY
        querytext = f'http://api.weatherapi.com/v1/current.json?key={WEATHER_API_KEY}&q={city}&aqi=yes'
        print(querytext)
        response = requests.get(querytext)
        return response.json()