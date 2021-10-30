import graphene
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required
from .models import CropPlantation
from crops.models import Crops

class CropPlantationType(DjangoObjectType):
    class Meta:
        model = CropPlantation

class CropPlantationQuery(graphene.ObjectType):
    all_crops_planted = graphene.List(CropPlantationType)

    crop_planted = graphene.Field(CropPlantationType, id = graphene.Int())

    @login_required
    def resolve_all_crops_planted(root, info):
        return CropPlantation.objects.filter(farmer = info.context.user) #may need to change user to farmer

    @login_required
    def resolve_crop_planted(root, info, id):
        return CropPlantation.objects.get(pk=id, farmer=info.context.user)

class CropPlantationCreate(graphene.Mutation):

    crop_plantation = graphene.Field(CropPlantationType)
    class Arguments:
        crop_name = graphene.String()
        planted_date = graphene.Date()
        harvested_date = graphene.Date()
    
    @classmethod
    @login_required
    def mutate(self, root, info, crop_name, planted_date, harvested_date):
        crop = Crops.objects.get(name = crop_name)
        
        crop_plantation = CropPlantation.objects.create(crop=crop, farmer=info.context.user, planted_date=planted_date, harvested_date=harvested_date)
        return CropPlantationCreate(crop_plantation = crop_plantation)

class CropPlantationUpdate(graphene.Mutation):

    crop_plantation = graphene.Field(CropPlantationType)
    class Arguments:
        id = graphene.ID(required=True)
        crop_name = graphene.String()
        planted_date = graphene.Date()
        harvested_date = graphene.Date()
    
    @classmethod
    @login_required
    def mutate(self, root, info, **kwargs):
        crop_plantation = CropPlantation.objects.get(pk=id, farmer = info.context.user)
        for k, v in kwargs.items():
            setattr(crop_plantation, k, v)
        crop_plantation.sive()
        return CropPlantationUpdate(crop_plantation = crop_plantation)

class CropPlantationDelete(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()

    @classmethod
    @login_required
    def mutate(cls, root, info, id):
        nd = CropPlantation.objects.get(pk=id, farmer = info.context.user).delete()
        return CropPlantationDelete(success = (nd[0] == 1))

class CropPlantationMutation(graphene.ObjectType):
    create_crop_plantation = CropPlantationCreate.Field()
    update_crop_plantation = CropPlantationUpdate.Field()
    delete_crop_plantation = CropPlantationDelete.Field()
