# Dockerfile (usando Python 3.11 slim)
FROM python:3.11-slim

# Evitar prompts al instalar paquetes
ENV DEBIAN_FRONTEND=noninteractive

# Instalar dependencias de sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Crear usuario no-root
RUN groupadd --system appgroup && useradd --system --create-home --gid appgroup appuser

WORKDIR /app

# Copiar requirements e instalar
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo el proyecto
COPY . .

# Dar permisos al usuario
RUN chown -R appuser:appgroup /app

# Cambiar a usuario no-root
USER appuser

EXPOSE 8000

# Arrancar Gunicorn (el servidor WSGI)
CMD ["gunicorn", "hw05_project.wsgi:application", "--bind", "0.0.0.0:8000"]
