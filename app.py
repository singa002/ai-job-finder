# backend/app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

ROBOT_URL = 'http://166.147.161.155:8080'

@app.route('/state')
def get_state():
    try:
        res = requests.get(f'{ROBOT_URL}/state', timeout=5)
        return jsonify(res.json())
    except Exception as e:
        return jsonify({'error': str(e)}), 502

@app.route('/map')
def get_map():
    try:
        res = requests.get(f'{ROBOT_URL}/map', timeout=5)
        return jsonify(res.json())
    except Exception as e:
        return jsonify({'error': str(e)}), 502

@app.route('/chassis/send-home', methods=['POST'])
def send_home():
    try:
        res = requests.post(f'{ROBOT_URL}/chassis/send-home', timeout=5)
        return jsonify(res.json())
    except Exception as e:
        return jsonify({'error': str(e)}), 502

@app.route('/chassis/jack-up', methods=['POST'])
def jack_up():
    try:
        res = requests.post(f'{ROBOT_URL}/chassis/jack-up', timeout=5)
        return jsonify(res.json())
    except Exception as e:
        return jsonify({'error': str(e)}), 502

@app.route('/chassis/jack-down', methods=['POST'])
def jack_down():
    try:
        res = requests.post(f'{ROBOT_URL}/chassis/jack-down', timeout=5)
        return jsonify(res.json())
    except Exception as e:
        return jsonify({'error': str(e)}), 502

@app.route('/chassis/moves', methods=['POST'])
def moves():
    try:
        body = request.get_json()
        res = requests.post(f'{ROBOT_URL}/chassis/moves', json=body, timeout=5)
        return jsonify(res.json())
    except Exception as e:
        return jsonify({'error': str(e)}), 502

if __name__ == '__main__':
    app.run(port=5000, debug=True)
