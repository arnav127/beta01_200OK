import graphene
from farmer.schema import (
    AuthMutation,
    AuthQuery,
    CropsQuery,
    CropPlantationQuery,
    FarmerMutation,
    CropPlantationMutation,
    CityQuery,
)


class Query(AuthQuery, CropsQuery, CropPlantationQuery, CityQuery, graphene.ObjectType):
    pass


class Mutation(
    AuthMutation, FarmerMutation, CropPlantationMutation, graphene.ObjectType
):
    pass


class Subscription(graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
