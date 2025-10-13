from flask import Flask, request, jsonify
from flask_cors import CORS
import redis
import uuid
import os

app = Flask(__name__)
CORS(app)

# Configuración de Redis
redis_host = os.getenv('REDIS_HOST', 'localhost')
redis_port = int(os.getenv('REDIS_PORT', 6379))
redis_client = redis.Redis(host=redis_host, port=redis_port, db=0, decode_responses=True)

# Tiempo de expiración en segundos (10 minutos)
SECRET_EXPIRATION = 10 * 60  # 10 minutos

@app.route('/api/store', methods=['POST'])
def store_secret():
    try:
        data = request.get_json()
        secret = data.get('secret')
        
        if not secret:
            return jsonify({'error': 'Secret is required'}), 400
        
        # Generar key única
        key = str(uuid.uuid4())
        
        # Guardar en Redis con expiración de 10 minutos
        redis_client.setex(key, SECRET_EXPIRATION, secret)
        
        return jsonify({
            'key': key,
            'expires_in': SECRET_EXPIRATION,
            'message': 'Secret stored successfully. It will expire in 10 minutes.'
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/retrieve/<key>', methods=['GET'])
def retrieve_secret(key):
    try:
        # Obtener el secreto
        secret = redis_client.get(key)
        
        if secret is None:
            return jsonify({'error': 'Secret not found, already viewed, or expired'}), 404
        
        # Eliminar el secreto después de leerlo
        redis_client.delete(key)
        
        return jsonify({'secret': secret}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=False)