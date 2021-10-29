import graphene

from graphene_django import DjangoObjectType
from graphql_auth.schema import UserQuery, MeQuery
from graphql_auth import mutations
from .models import ExtendUser, Crops, CropPlantation
from graphql_jwt.decorators import login_required

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

class CropsType(DjangoObjectType):
    
    class Meta:
        model = Crops

class CropPlantationType(DjangoObjectType):
    class Meta:
        model = CropPlantation

class CropsQuery(graphene.ObjectType):
    all_crops = graphene.List(CropsType)
    crop = graphene.Field(CropsType, name=graphene.String())

    def resolve_all_crops(root, info):
        return Crops.objects.all()

    def resolve_crop(root, info, name):
        return Crops.objects.get(name=name) # may need to change get to filter

class CropPlantationQuery(graphene.ObjectType):
    all_crops_planted = graphene.List(CropPlantationType)

    crop_planted = graphene.Field(CropPlantationType, id = graphene.Int())

    @login_required
    def resolve_all_crops_planted(root, info):
        return CropPlantation.objects.filter(farmer = info.context.user) #may need to change user to farmer

    @login_required
    def resolve_crop_planted(root, info, id):
        return CropPlantation.objects.get(pk=id, farmer=info.context.user)

class FarmerQuery(graphene.ObjectType):
    pass


class SendCropRecommendation(graphene.Mutation):
    class Arguments:
        crops = graphene.List(graphene.String)

    ok = graphene.Boolean()

    def mutate(self, info, name, **kwargs):
        ok = True
        # broadcast here
        return SendCropRecommendation(ok=ok)


class FarmerMutation(graphene.ObjectType):
    send_crop_recommendation = SendCropRecommendation.Field()
    
