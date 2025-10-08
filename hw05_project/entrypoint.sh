#!/bin/sh
echo "Esperando que la base de datos esté lista..."
RETRIES=30
until python manage.py showmigrations >/dev/null 2>&1 || [ $RETRIES -le 0 ]; do
  echo "Base de datos no lista, esperando 2s..."
  sleep 2
  RETRIES=$((RETRIES-1))
done

echo "Ejecutando migraciones..."
python manage.py migrate --noinput

echo "Arrancando servidor..."
exec gunicorn hw05_project.wsgi:application --bind 0.0.0.0:8000
