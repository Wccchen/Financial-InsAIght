from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import User, Portfolio
from .serializers import UserSerializer, PortfolioSerializer
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.utils.encoding import force_str
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
from rest_framework_simplejwt.authentication import JWTAuthentication

SALT = "8b4f6b2cc1868d75ef79e5cfb8779c11b6a374bf0fce05b485581bf4e1e25b96c8c2855015de8449"
URL = "http://localhost:3000"


def mail_template(content, button_url, button_text):
    return f"""<!DOCTYPE html>
            <html>
            <body style="text-align: center; font-family: "Verdana", serif; color: #000;">
                <div style="max-width: 600px; margin: 10px; background-color: #fafafa; padding: 25px; border-radius: 20px;">
                <p style="text-align: left;">{content}</p>
                <a href="{button_url}" target="_blank">
                    <button style="background-color: #444394; border: 0; width: 200px; height: 30px; border-radius: 6px; color: #fff;">{button_text}</button>
                </a>
                <p style="text-align: left;">
                    If you are unable to click the above button, copy paste the below URL into your address bar
                </p>
                <a href="{button_url}" target="_blank">
                    <p style="margin: 0px; text-align: left; font-size: 10px; text-decoration: none;">{button_url}</p>
                </a>
                </div>
            </body>
            </html>"""


class RegistrationView(APIView):
    def post(self, request, format=None):
        request.data["password"] = make_password(
            password=request.data["password"], salt=SALT
        )
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"success": True, "message": "You are now registered on our website!"},
                status=status.HTTP_200_OK,
            )
        else:
            error_msg = ""
            for key in serializer.errors:
                error_msg += serializer.errors[key][0]
            return Response(
                {"success": False, "message": error_msg},
                status=status.HTTP_200_OK,
            )

class ForgotPasswordView(APIView):
    def post(self, request, format=None):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"success": False, "message": "User with provided email does not exist."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Generate password reset token
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        # Build password reset URL
        reset_url = f"{settings.FRONTEND_URL}/resetPassword?uid={uid}&token={token}"

        # Send email
        send_mail(
            "Password Reset Request",
            f"Click the link below to reset your password:\n{reset_url}",
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )

        return Response(
            {"success": True, "message": "Password reset link has been sent to your email."},
            status=status.HTTP_200_OK
        )

class ResetPasswordView(APIView):
    def post(self, request, format=None):
        uidb64 = request.data.get('uid')
        token = request.data.get('token')
        new_password = request.data.get('password')

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.password = make_password(new_password)
            user.save()
            return Response({"success": True, "message": "Password has been reset successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False, "message": "Invalid token or user ID."}, status=status.HTTP_400_BAD_REQUEST)
        
class LoginView(APIView):
    def post(self, request, format=None):
        email = request.data.get("email")
        password = request.data.get("password")
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"success": False, "message": "Invalid login credentials!"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not user.check_password(password):
            return Response(
                {"success": False, "message": "Invalid login credentials!"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "success": True,
                "message": "You are now logged in!",
                "user": {
                    "name": user.name,
                    "email": user.email,
                },
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            },
            status=status.HTTP_200_OK,
        )

        
from rest_framework_simplejwt.authentication import JWTAuthentication

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
    
        jwt_authenticator = JWTAuthentication()
        user, token = jwt_authenticator.authenticate(request)
        
        if not user:
            return Response(
                {"detail": "User not found", "code": "user_not_found"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        portfolios = Portfolio.objects.filter(user=user)
        portfolio_data = PortfolioSerializer(portfolios, many=True).data

        return Response(
            {
                "success": True,
                "message": "User Dashboard Data",
                "user": {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "portfolios": portfolio_data,
                }
            },
            status=status.HTTP_200_OK,
        )
        
class AddAssetView(APIView):
    def post(self, request, format=None):
        # Fetch the portfolio ID from the request data
        portfolio_id = request.data.get('portfolio_id')

        if not portfolio_id:
            return Response(
                {"success": False, "message": "Portfolio ID is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            portfolio = Portfolio.objects.get(id=portfolio_id)
        except Portfolio.DoesNotExist:
            return Response(
                {"success": False, "message": "Portfolio does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = PortfolioItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(portfolio=portfolio)
            return Response(
                {"success": True, "message": "Asset added successfully!"},
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                {"success": False, "message": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

class CreatePortfolioView(APIView):
    def post(self, request, format=None):
        user = request.user
        
        portfolio_name = request.data.get('portfolio_name')

        if not portfolio_name:
            return Response(
                {"success": False, "message": "Portfolio name is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        portfolio = Portfolio(user=user, name=portfolio_name)
        portfolio.save()

        return Response(
            {"success": True, "message": "Portfolio created successfully!"},
            status=status.HTTP_201_CREATED,
        )





class AnalysePortfolioView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
    
        text = request.data.get('text')

        if not text:
            return Response({"error": "No text provided for analysis."}, status=400)

        tokenizer = AutoTokenizer.from_pretrained("mrm8488/distilroberta-finetuned-financial-news-sentiment-analysis")
        model = AutoModelForSequenceClassification.from_pretrained("mrm8488/distilroberta-finetuned-financial-news-sentiment-analysis")

        nlp = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)

        results = nlp([text])
        print(results)
        simplified_results = [{"label":result["label"], "score":result["score"]} for result in results]
        return Response({"analysis": simplified_results[0]}, status=200)
