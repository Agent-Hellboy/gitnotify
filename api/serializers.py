from rest_framework import serializers
from django.contrib.auth.models import User
from github_service.models import GitHubProfile, Repository, NotificationPreference, IssueNotification

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')
        read_only_fields = ('id',)

class GitHubProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = GitHubProfile
        fields = ('id', 'github_token', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ('id', 'name', 'owner', 'last_checked', 'created_at', 'updated_at')
        read_only_fields = ('id', 'last_checked', 'created_at', 'updated_at')

class NotificationPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationPreference
        fields = ('id', 'frequency', 'email_notifications', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

class IssueNotificationSerializer(serializers.ModelSerializer):
    repository_name = serializers.CharField(source='repository.name', read_only=True)
    repository_owner = serializers.CharField(source='repository.owner', read_only=True)

    class Meta:
        model = IssueNotification
        fields = (
            'id', 'repository', 'repository_name', 'repository_owner',
            'issue_number', 'title', 'state', 'created_by', 'assigned_to',
            'created_at', 'updated_at', 'notified_at'
        )
        read_only_fields = (
            'id', 'repository_name', 'repository_owner', 'created_at',
            'updated_at', 'notified_at'
        )
