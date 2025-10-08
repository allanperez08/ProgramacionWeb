FROM python:3.11-slim

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*


# 3. Crear usuario no root
RUN groupadd --system appgroup && useradd --system --create-home --gid appgroup appuser

# 4. Establecer directorio de trabajo
WORKDIR /app

# 5. Copiar requirements e instalar librerías de Python
COPY requirements-docker.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# 6. Copiar todo el proyecto
COPY . .

# 7. Cambiar a usuario no root
USER appuser

# 8. Comando por defecto
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
