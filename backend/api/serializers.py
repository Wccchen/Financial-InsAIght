from rest_framework import serializers
from .models import User, Token, Portfolio, PortfolioItem


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["name", "email", "password", "country", "phone"]


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ["token", "created_at", "expires_at", "user_id", "is_used"]
        
class PortfolioItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioItem
        fields = '__all__'
      
class PortfolioSerializer(serializers.ModelSerializer):
        items = PortfolioItemSerializer(many=True, read_only=True)
        class Meta:
            model = Portfolio
            fields = '__all__'
            