from django.contrib import admin
from .models import User, Portfolio, PortfolioItem, TextAnalysis

# Register your models here.
admin.site.register(User)
admin.site.register(Portfolio)
admin.site.register(PortfolioItem)
admin.site.register(TextAnalysis)