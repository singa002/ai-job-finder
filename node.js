import requests
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

ROBOT_HTTP_URL = "http://166.147.161.155:8080"

def robot_get(path):
    try:
        resp = requests.get(f"{ROBOT_HTTP_URL}{path}", timeout=5)
        resp.raise_for_status()
        return jsonify(resp.json()), resp.status_code
    except requests.exceptions.Timeout:
        return jsonify({"error": "Robot request timed out"}), 504
    except requests.exceptions.ConnectionError:
        return jsonify({"error": "Could not connect to robot"}), 502
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def robot_post(path, body=None):
    try:
        resp = requests.post(
            f"{ROBOT_HTTP_URL}{path}",
            json=body,
            timeout=5
        )
        resp.raise_for_status()
        return jsonify(resp.json()), resp.status_code
    except requests.exceptions.Timeout:
        return jsonify({"error": "Robot request timed out"}), 504
    except requests.exceptions.ConnectionError:
        return jsonify({"error": "Could not connect to robot"}), 502
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/map', methods=['GET'])
def get_map():
    return robot_get('/map')

@app.route('/state', methods=['GET'])
def get_state():
    return robot_get('/state')

@app.route('/chassis/moves', methods=['POST'])
def move_robot():
    body = request.get_json()
    if not body or 'target_x' not in body or 'target_y' not in body:
        return jsonify({"error": "Missing target_x or target_y"}), 400
    return robot_post('/chassis/moves', body)

@app.route('/chassis/send-home', methods=['POST'])
def send_home():
    return robot_post('/chassis/send-home')

@app.route('/chassis/jack-up', methods=['POST'])
def jack_up():
    return robot_post('/chassis/jack-up')

@app.route('/chassis/jack-down', methods=['POST'])
def jack_down():
    return robot_post('/chassis/jack-down')

if __name__ == '__main__':
    app.run(debug=True, port=8080, host='0.0.0.0')
