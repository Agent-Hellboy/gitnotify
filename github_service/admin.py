from django.contrib import admin
from .models import GitHubProfile, Repository, NotificationPreference, IssueNotification

@admin.register(GitHubProfile)
class GitHubProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at', 'updated_at')
    search_fields = ('user__username', 'user__email')

@admin.register(Repository)
class RepositoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'profile', 'last_checked')
    search_fields = ('name', 'owner')
    list_filter = ('profile',)

@admin.register(NotificationPreference)
class NotificationPreferenceAdmin(admin.ModelAdmin):
    list_display = ('user', 'frequency', 'email_notifications')
    list_filter = ('frequency', 'email_notifications')
    search_fields = ('user__username', 'user__email')

@admin.register(IssueNotification)
class IssueNotificationAdmin(admin.ModelAdmin):
    list_display = ('repository', 'issue_number', 'title', 'state', 'created_by', 'assigned_to')
    list_filter = ('state', 'repository')
    search_fields = ('title', 'created_by', 'assigned_to')
    date_hierarchy = 'created_at'
