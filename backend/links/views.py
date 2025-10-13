from django.shortcuts import render
from rest_framework import viewsets
from .models import SecretLink
from .serializers import SecretLinkSerializer

class SecretLinkViewSet(viewsets.ModelViewSet):
    queryset = SecretLink.objects.all()
    serializer_class = SecretLinkSerializer
