from django.urls import path
from .views import RegistrationView, LoginView, ForgotPasswordView, ResetPasswordView,DashboardView, AnalysePortfolioView,AddPortfolioView

urlpatterns = [
    path("register", RegistrationView.as_view(), name="register"),
    path("login", LoginView.as_view(), name="login"),
    path("forgotPassword", ForgotPasswordView.as_view(), name="forgotPassword"),
    path("resetPassword", ResetPasswordView.as_view(), name="resetPassword"),
    path("dashboard",DashboardView.as_view(), name="dashboard"),
    path("addportfolio",AddPortfolioView.as_view(), name="addportfolio"),
    path("analyse", AnalysePortfolioView.as_view(), name="analyse")
]
