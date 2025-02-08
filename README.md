🤖 Welcome to the AI-Powered Development Revolution! 🚀

This repository is my experiment in "Zero-Brain Development" - where I'm letting AI do the heavy lifting while I sit back with popcorn 🍿. Using the power of AI, we're building a modern SaaS application with Django and React, and I'm just here to watch the magic happen.

🧪 The Experiment:
- Going full AI mode: My brain is on vacation while AI does the coding
- Time Tracking: Documenting how fast AI can build a production-ready app
- Tracking When i need to push AI and When i don't need to push AI

💡 Think of it as "Inception" but for coding - it's AI all the way down!

The fun part is even the code push is automated and I am thinking of giving commands verbally

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

## Running with Docker Compose (Recommended)

### Prerequisites
- Docker
- Docker Compose

### Steps

1. Clone the repository:
```bash
git clone https://github.com/Agent-Hellboy/gitnotify.git
cd gitnotify
```

2. Create a `.env` file in the root directory:
```env
DEBUG=0
SECRET_KEY=your-secret-key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-specific-password
GITHUB_TOKEN=your-github-personal-access-token
```

3. Build and start the services:
```bash
docker-compose up --build
```

4. Create a superuser (in a new terminal):
```bash
docker-compose exec backend python manage.py createsuperuser
```

The application will be available at:
- Frontend: http://localhost:80
- Backend API: http://localhost:80/api
- Admin Interface: http://localhost:80/admin

## Local Development Setup

### Prerequisites
- Python 3.8+
- Node.js 14+
- Redis
- PostgreSQL

### PostgreSQL Setup

1. Install PostgreSQL:
```bash
brew install postgresql@14
brew services start postgresql
```

2. Create database and user:
```bash
psql postgres

# In psql shell:
CREATE DATABASE gitnotify;
CREATE USER gitnotify WITH PASSWORD 'your_password';
ALTER ROLE gitnotify SET client_encoding TO 'utf8';
ALTER ROLE gitnotify SET default_transaction_isolation TO 'read committed';
ALTER ROLE gitnotify SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE gitnotify TO gitnotify;
\q
```

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

3. Create `.env` file:
```env
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://gitnotify:your_password@localhost:5432/gitnotify
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-specific-password
GITHUB_TOKEN=your-github-personal-access-token
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create superuser:
```bash
python manage.py createsuperuser
```

6. Install and start Redis server:
```bash
# Install Redis
brew install redis

# Start Redis server
brew services start redis
# or
redis-server
```

7. Start Celery worker (in a new terminal):
```bash
celery -A gitnotify worker -l info
```

8. Start Celery beat (in a new terminal):
```bash
celery -A gitnotify beat -l info
```

9. Run Django development server:
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

## Development Commands

### Backend
```bash
# Format code
black .

# Sort imports
isort .

# Check code quality
flake8 .
```

### Frontend
```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
