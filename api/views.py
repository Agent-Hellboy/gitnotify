from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from github_service.models import GitHubProfile, Repository, NotificationPreference, IssueNotification
from .serializers import UserSerializer, GitHubProfileSerializer, RepositorySerializer, NotificationPreferenceSerializer, IssueNotificationSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

class GitHubProfileViewSet(viewsets.ModelViewSet):
    queryset = GitHubProfile.objects.all()
    serializer_class = GitHubProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return GitHubProfile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class RepositoryViewSet(viewsets.ModelViewSet):
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Repository.objects.filter(profile__user=self.request.user)

    def perform_create(self, serializer):
        profile = GitHubProfile.objects.get(user=self.request.user)
        serializer.save(profile=profile)

class NotificationPreferenceViewSet(viewsets.ModelViewSet):
    queryset = NotificationPreference.objects.all()
    serializer_class = NotificationPreferenceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return NotificationPreference.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class IssueNotificationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = IssueNotification.objects.all()
    serializer_class = IssueNotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return IssueNotification.objects.filter(repository__profile__user=self.request.user)

    @action(detail=False, methods=['post'])
    def mark_all_as_read(self, request):
        self.get_queryset().filter(notified_at__isnull=True).update(notified_at=timezone.now())
        return Response({'status': 'notifications marked as read'}, status=status.HTTP_200_OK)
