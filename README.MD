# Secret Link App - Assessment 3

A secure one-time secret sharing application similar to scrt.link.

## Quick Start

### Prerequisites
- Docker
- Docker Compose

### Installation & Run

1. **Clone and setup:**
```bash
git clone <https://github.com/allanperez08/ProgramacionWeb>
cd ProgramacionWeb
git checkout assessment-3

2. **Run the application:**
    docker-compose up --build

3. **Access the services:**
    Web Application: http://localhost:3000
    Redis GUI: http://localhost:8081

How It Works

    Hide a Secret:

        Navigate to the "Hide Secret" tab in the web application

        Type your secret and click the "Create Secure Link" button

        Copy the unique key that is generated

    Reveal a Secret:

        Go to the "Reveal Secret" tab

        Paste the key and click the "Reveal Secret Once" button

        The secret will be displayed and immediately deleted from the database

    Verify in Redis:

        You can go to the Redis GUI (http://localhost:8081) to verify that keys are stored and deleted

        Secrets automatically expire after 10 minutes if not viewed

    Security Features:

        If you try to use the same key again, you will get a "Secret not found" error

        Each key can only be used once

        Unique UUID keys prevent collisions

4. **Stop the Application**
    docker compose down