import graphene
from farmer.schema import AuthMutation, AuthQuery, CropsQuery, CropPlantationQuery, FarmerMutation, CropPlantationMutation

class Query(AuthQuery, CropsQuery, CropPlantationQuery, graphene.ObjectType):
    pass

class Mutation(AuthMutation, FarmerMutation, CropPlantationMutation, graphene.ObjectType):
    pass

class Subscription(graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
