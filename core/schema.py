import graphene
from farmer.schema import AuthMutation, AuthQuery

class Query(AuthQuery):
    pass

class Mutation(AuthMutation):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)