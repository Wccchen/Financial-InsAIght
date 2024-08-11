from django.db import models

# Create your models here.

class Token(models.Model):
    id = models.AutoField(primary_key=True)
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField()
    expires_at = models.DateTimeField()
    user_id = models.IntegerField()
    is_used = models.BooleanField(default=False)


class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    phone = models.CharField(max_length=10, null=True)
    country = models.CharField(max_length=63)

    def __str__(self) -> str:
        return self.name
    
class Portfolio(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True) 

    def __str__(self):
        return f"{self.name} - {self.user.name}"

class PortfolioItem(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE, related_name='items') 
    asset_name = models.CharField(max_length=100) 
    asset_type = models.CharField(max_length=50) 
    quantity = models.DecimalField(max_digits=10, decimal_places=2) 
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2) 
    current_value = models.DecimalField(max_digits=10, decimal_places=2)  
    purchase_date = models.DateField() 

    def __str__(self):
        return f"{self.asset_name} ({self.asset_type}) - {self.portfolio.name}"