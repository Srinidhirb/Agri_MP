from flask import Flask, request, jsonify, session
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS) to allow your React app to communicate with Flask API
app.secret_key = os.urandom(24)

# Database initialization (if not already created)
def init_db():
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)''')
    conn.commit()
    conn.close()

# Login route
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = ? AND password = ?", (username, password))
    user = cursor.fetchone()
    conn.close()

    if user:
        session['user'] = username
        return jsonify({'message': 'Login successful', 'username': username}), 200
    else:
        return jsonify({'message': 'Invalid credentials, try again.'}), 401

# Logout route
@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify({'message': 'Logged out successfully.'}), 200

# Registration route
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({'message': 'Username already exists. Please choose another one.'}), 400

    # Insert the new user into the database
    cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Registration successful.'}), 201

# Home page after login (for testing)
@app.route('/api/home', methods=['GET'])
def home():
    if 'user' in session:
        return jsonify({'message': f'Welcome {session["user"]}!'}), 200
    return jsonify({'message': 'User not logged in.'}), 401

if __name__ == '__main__':
    init_db()  # Initialize the database
    app.run(debug=True)
