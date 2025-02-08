from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'github-profiles', views.GitHubProfileViewSet)
router.register(r'repositories', views.RepositoryViewSet)
router.register(r'notification-preferences', views.NotificationPreferenceViewSet)
router.register(r'issue-notifications', views.IssueNotificationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
