from flask import Flask, request, jsonify
from handler import oil_paint, sketch, cartoon
app = Flask(__name__)
@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Hello, World!'})
if __name__ == '__main__':
    app.run(debug=True)