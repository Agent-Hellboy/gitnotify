from django.db import models
from django.contrib.auth.models import User

class GitHubProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    github_token = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s GitHub Profile"

class Repository(models.Model):
    profile = models.ForeignKey(GitHubProfile, on_delete=models.CASCADE, related_name='repositories')
    name = models.CharField(max_length=255)
    owner = models.CharField(max_length=255)
    last_checked = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('profile', 'owner', 'name')
        verbose_name_plural = 'repositories'

    def __str__(self):
        return f"{self.owner}/{self.name}"

class NotificationPreference(models.Model):
    FREQUENCY_CHOICES = [
        ('daily', 'Daily'),
        ('weekly', 'Weekly'),
        ('realtime', 'Real-time'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    frequency = models.CharField(max_length=10, choices=FREQUENCY_CHOICES, default='daily')
    email_notifications = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Notification Preferences"

class IssueNotification(models.Model):
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)
    issue_number = models.IntegerField()
    title = models.CharField(max_length=255)
    state = models.CharField(max_length=20)
    created_by = models.CharField(max_length=100)
    assigned_to = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    notified_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"#{self.issue_number} - {self.title}"
