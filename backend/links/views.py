from django.shortcuts import render
from rest_framework import viewsets
from .models import SecretLink
from .serializers import SecretLinkSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.cache import cache
import uuid

class SecretLinkViewSet(viewsets.ModelViewSet):
    queryset = SecretLink.objects.all()
    serializer_class = SecretLinkSerializer

class HideSecretView(APIView):
    def post(self, request):
        secret_text = request.data.get("text")
        if not secret_text:
            return Response({"error": "No se recibió texto"}, status=status.HTTP_400_BAD_REQUEST)
        
        key = str(uuid.uuid4())[:8]  # genera una key corta
        cache.set(key, secret_text, timeout=3600)  # expira en 1 hora
        return Response({"key": key})

class RevealSecretView(APIView):
    def post(self, request):
        key = request.data.get("key")
        if not key:
            return Response({"error": "No se recibió key"}, status=status.HTTP_400_BAD_REQUEST)

        secret_text = cache.get(key)
        if not secret_text:
            return Response({"error": "El secreto no existe o ya fue revelado"}, status=status.HTTP_404_NOT_FOUND)

        cache.delete(key)  # destruye el secreto
        return Response({"text": secret_text})