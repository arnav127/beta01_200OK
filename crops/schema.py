import graphene
from graphene_django import DjangoObjectType
from .models import Crops

class CropsType(DjangoObjectType):
    class Meta:
        model = Crops

class CropsQuery(graphene.ObjectType):
    all_crops = graphene.List(CropsType)
    crop = graphene.Field(CropsType, name=graphene.String())

    def resolve_all_crops(root, info):
        return Crops.objects.all()

    def resolve_crop(root, info, name):
        return Crops.objects.get(name=name) # may need to change get to filter
