import graphene
import channels
import channels_graphql_ws
from farmer.schema import AuthMutation, AuthQuery, FarmerMutation, CityQuery
from crops.schema import CropsQuery
from crop_plantations.schema import CropPlantationQuery, CropPlantationMutation
from soil_health.schema import SoilHealthQuery, SoilHealthMutation, SoilHealthSubscriptions
from farmer.schema import WeatherQuery
from farmer.schema import MSRPQuery

class Query(
    AuthQuery,
    CityQuery,
    CropsQuery,
    CropPlantationQuery,
    SoilHealthQuery,
    WeatherQuery,
    MSRPQuery,
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


class Subscription(SoilHealthSubscriptions, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation, subscription=Subscription)

class WsConsumer(channels_graphql_ws.GraphqlWsConsumer):

    schema = schema
    
    # send_keepalive_every = 42
    async def on_connect(self, payload):
        self.scope["user"] = await channels.auth.get_user(self.scope)

