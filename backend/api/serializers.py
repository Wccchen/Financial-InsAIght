from rest_framework import serializers
from .models import User, Portfolio, PortfolioItem, TextAnalysis


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["name", "email", "password", "country", "phone"]

 
class PortfolioItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioItem
        fields = ['asset_name', 'asset_type', 'quantity', 'purchase_price', 'current_value', 'purchase_date']


      
class PortfolioSerializer(serializers.ModelSerializer):
        items = PortfolioItemSerializer(many=True, read_only=True)
        class Meta:
            model = Portfolio
            fields = '__all__'

class TextAnalysisSerializer(serializers.ModelSerializer):
        items = PortfolioItemSerializer(many=True, read_only=True)
        class Meta:
            model = Portfolio
            fields = '__all__'
            