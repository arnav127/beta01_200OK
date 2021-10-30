import graphene
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required
from .models import SoilHealth
from farmer.models import ExtendUser


class SoilHealthType(DjangoObjectType):
    class Meta:
        model = SoilHealth

class SoilHealthQuery(graphene.ObjectType):
    pass

class SoilHealthCreate(graphene.Mutation):
    soil_health = graphene.Field(SoilHealthType)
    class Arguments:
        soil_type = graphene.String()
        soil_ph = graphene.Float()
        soil_nitrogen = graphene.Float()
        soil_potassium = graphene.Float()
        soil_phosphorus = graphene.Float()
    
    @classmethod
    def mutate(self, root, info,soil_type, soil_ph, soil_nitrogen, soil_potassium, soil_phosphorus):
        soil_health = SoilHealth.objects.create(owner=info.context.user, soil_type=soil_type, 
            soil_ph=soil_ph, soil_nitrogen=soil_nitrogen,
            soil_potassium=soil_potassium, soil_phosphorus=soil_phosphorus)
        return SoilHealthCreate(soil_health = soil_health)


class SoilHealthMutation(graphene.ObjectType):
    create_soil_health = SoilHealthCreate.Field()