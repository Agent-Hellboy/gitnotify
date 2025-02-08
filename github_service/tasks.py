from celery import shared_task
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils import timezone
from github import Github
from .models import Repository, IssueNotification, GitHubProfile

@shared_task
def fetch_github_issues():
    """
    Fetch GitHub issues for all repositories and create notifications
    """
    profiles = GitHubProfile.objects.all()
    
    for profile in profiles:
        g = Github(profile.github_token)
        repositories = Repository.objects.filter(profile=profile)
        
        for repo in repositories:
            try:
                github_repo = g.get_repo(f"{repo.owner}/{repo.name}")
                issues = github_repo.get_issues(state='all', since=repo.last_checked)
                
                for issue in issues:
                    IssueNotification.objects.get_or_create(
                        repository=repo,
                        issue_number=issue.number,
                        defaults={
                            'title': issue.title,
                            'state': issue.state,
                            'created_by': issue.user.login,
                            'assigned_to': issue.assignee.login if issue.assignee else None,
                            'created_at': issue.created_at,
                            'updated_at': issue.updated_at
                        }
                    )
                
                repo.last_checked = timezone.now()
                repo.save()
                
            except Exception as e:
                print(f"Error fetching issues for {repo}: {str(e)}")

@shared_task
def send_daily_digest():
    """
    Send daily digest of GitHub issues to users
    """
    from .models import NotificationPreference
    
    daily_users = NotificationPreference.objects.filter(
        frequency='daily',
        email_notifications=True
    )
    
    for pref in daily_users:
        user = pref.user
        profile = GitHubProfile.objects.get(user=user)
        repositories = Repository.objects.filter(profile=profile)
        
        # Get notifications from the last 24 hours
        notifications = IssueNotification.objects.filter(
            repository__in=repositories,
            created_at__gte=timezone.now() - timezone.timedelta(days=1),
            notified_at__isnull=True
        )
        
        if notifications:
            # Prepare email content
            context = {
                'user': user,
                'notifications': notifications,
                'date': timezone.now().date()
            }
            
            html_content = render_to_string('github_service/email/daily_digest.html', context)
            
            # Send email
            send_mail(
                subject=f'GitHub Issues Daily Digest - {timezone.now().date()}',
                message='',
                from_email='your-email@example.com',
                recipient_list=[user.email],
                html_message=html_content
            )
            
            # Mark notifications as sent
            notifications.update(notified_at=timezone.now())
