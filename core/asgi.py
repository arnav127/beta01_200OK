import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

import django
django.setup()

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from core.schema import WsConsumer


application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(URLRouter([
        path("graphql", WsConsumer.as_asgi()),
    ]))
})
