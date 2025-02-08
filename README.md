🤖 Welcome to the AI-Powered Development Revolution! 🚀

This repository is my experiment in "Zero-Brain Development" - where I'm letting AI do the heavy lifting while I sit back with popcorn 🍿. Using the power of AI, we're building a modern SaaS application with Django and React, and I'm just here to watch the magic happen.

🧪 The Experiment:
- Going full AI mode: My brain is on vacation while AI does the coding
- Time Tracking: Documenting how fast AI can build a production-ready app
- Tracking When i need to push AI and When i don't need to push AI

💡 Think of it as "Inception" but for coding - it's AI all the way down!


# GitNotify

A full-stack application that sends daily email summaries of GitHub issues using Django and React.

## Features

- User authentication with JWT
- GitHub repository integration
- Customizable notification preferences
- Daily email digests of GitHub issues
- Real-time issue tracking
- Modern React UI with Material-UI
- Background task processing with Celery

## Tech Stack

### Backend
- Django
- Django REST Framework
- Celery (with Redis)
- PostgreSQL
- JWT Authentication

### Frontend
- React
- TypeScript
- Material-UI
- Redux Toolkit
- React Router

## Setup

### Prerequisites
- Python 3.8+
- Node.js 14+
- Redis
- PostgreSQL

### Backend Setup

1. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run migrations:
```bash
python manage.py migrate
```

4. Create superuser:
```bash
python manage.py createsuperuser
```

5. Start Redis server:
```bash
redis-server
```

6. Start Celery worker:
```bash
celery -A gitnotify worker -l info
```

7. Start Celery beat:
```bash
celery -A gitnotify beat -l info
```

8. Run Django development server:
```bash
python manage.py runserver
```

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start development server:
```bash
npm start
```

## Usage

1. Access the application at http://localhost:3000
2. Log in with your credentials
3. Add GitHub repositories to monitor
4. Configure notification preferences
5. Receive daily email digests of your GitHub issues

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-specific-password
GITHUB_TOKEN=your-github-personal-access-token
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
