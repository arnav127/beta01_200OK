import graphene
from farmer.schema import AuthMutation, AuthQuery, CropsQuery, CropPlantationQuery

class Query(AuthQuery, CropsQuery, CropPlantationQuery):
    pass

class Mutation(AuthMutation):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)