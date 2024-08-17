from django.urls import path
from .views import RegistrationView, LoginView, ForgotPasswordView, ResetPasswordView, DashboardView, AnalysePortfolioView, AddAssetView, CreatePortfolioView

urlpatterns = [
    path("register", RegistrationView.as_view(), name="register"),
    path("login", LoginView.as_view(), name="login"),
    path("forgotPassword", ForgotPasswordView.as_view(), name="forgotPassword"),
    path("resetPassword", ResetPasswordView.as_view(), name="resetPassword"),
    path("dashboard",DashboardView.as_view(), name="dashboard"),
    path("addasset",AddAssetView.as_view(), name="addasset"),
    path("createportfolio",CreatePortfolioView.as_view(), name="createportfolio"),
    path("analyse", AnalysePortfolioView.as_view(), name="analyse")
]
