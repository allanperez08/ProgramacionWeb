from rest_framework import serializers
from .models import SecretLink

class SecretLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SecretLink
        fields = '__all__'
