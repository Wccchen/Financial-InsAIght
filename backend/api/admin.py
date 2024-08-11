from django.contrib import admin
from .models import User, Portfolio

# Register your models here.
admin.site.register(User)
admin.site.register(Portfolio)