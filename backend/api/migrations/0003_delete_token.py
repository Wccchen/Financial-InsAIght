# Generated by Django 5.0.6 on 2024-08-11 06:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_portfolio_portfolioitem'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Token',
        ),
    ]