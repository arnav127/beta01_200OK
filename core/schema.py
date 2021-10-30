import graphene
from farmer.schema import AuthMutation, AuthQuery, FarmerMutation, CityQuery
from crops.schema import CropsQuery
from crop_plantations.schema import CropPlantationQuery, CropPlantationMutation
from soil_health.schema import SoilHealthQuery, SoilHealthMutation

class Query(
    AuthQuery,
    CityQuery,
    CropsQuery,
    CropPlantationQuery,
    SoilHealthQuery,
    graphene.ObjectType,
):
    pass


class Mutation(
    AuthMutation,
    FarmerMutation,
    CropPlantationMutation,
    SoilHealthMutation,
    graphene.ObjectType,
):
    pass


class Subscription(graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
