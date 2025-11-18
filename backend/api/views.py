from rest_framework.decorators import api_view
from rest_framework.response import Response

TOKEN = "demo123"

def token_required(request):
    auth = request.META.get("HTTP_AUTHORIZATION", "")
    return auth == f"Bearer {TOKEN}"

@api_view(['POST'])
def login(request):
    if request.data.get('email') == 'viewer@vite.co.in' and request.data.get('password') == 'pass123':
        return Response({"token": TOKEN})
    return Response({"error": "Invalid credentials"}, status=400)

@api_view(['GET'])
def summary(request):
    if not token_required(request):
        return Response({"error": "Forbidden"}, status=403)
    return Response({"total_sales": 12000, "total_orders": 340})

@api_view(['GET'])
def chart(request):
    if not token_required(request):
        return Response({"error": "Forbidden"}, status=403)
    return Response([
        {"month": "Jan", "sales": 2000},
        {"month": "Feb", "sales": 2500},
        {"month": "Mar", "sales": 3000},
        {"month": "Apr", "sales": 1500},
        {"month": "May", "sales": 3200},
    ])

@api_view(['GET'])
def table(request):
    if not token_required(request):
        return Response({"error": "Forbidden"}, status=403)
    return Response([
        {"date": "2024-01-02", "product": "Item A", "category": "Cat1", "amount": 200},
        {"date": "2024-01-03", "product": "Item B", "category": "Cat2", "amount": 350},
        {"date": "2024-01-04", "product": "Item C", "category": "Cat3", "amount": 150},
    ])
