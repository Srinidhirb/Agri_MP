from flask import Flask, request, jsonify, session
from flask_cors import CORS
import sqlite3
import os
import bcrypt  # Import bcrypt for password hashing
from datetime import timedelta

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])  # Allow React frontend to make requests
app.secret_key = os.urandom(24)

# Set session lifetime and cookie name
app.permanent_session_lifetime = timedelta(days=7)  # Optional: Set session expiration
app.config['SESSION_COOKIE_NAME'] = 'your_session_cookie_name'  # Set a custom session cookie name

# Database initialization (if not already created)
def init_db():
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute(''' 
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY, 
            username TEXT UNIQUE, 
            email TEXT UNIQUE, 
            password TEXT, 
            phone_number TEXT, 
            place TEXT
        )
    ''')
    conn.commit()
    conn.close()

# Login route
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    identifier = data.get('identifier')  # Can be username or email
    password = data.get('password')
    
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute("SELECT username, password FROM users WHERE username = ? OR email = ?", (identifier, identifier))
    user = cursor.fetchone()
    conn.close()

    if user and bcrypt.checkpw(password.encode('utf-8'), user[1].encode('utf-8')):
        session['user'] = user[0]  # Store the username in the session
        session.permanent = True  # Make the session permanent (optional)
        return jsonify({'message': 'Login successful', 'username': user[0]}), 200
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
    email = data.get('email')
    password = data.get('password')
    phone_number = data.get('phone_number')
    place = data.get('place')

    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = ? OR email = ?", (username, email))
    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({'message': 'Username or Email already exists. Please choose another one.'}), 400

    # Hash the password before storing it
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    cursor.execute("INSERT INTO users (username, email, password, phone_number, place) VALUES (?, ?, ?, ?, ?)",
                   (username, email, hashed_password, phone_number, place))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Registration successful.'}), 201

# Home page after login (for testing)
@app.route('/api/home', methods=['GET'])
def home():
    if 'user' in session:
        return jsonify({
            'message': f'Welcome {session["user"]}!',
            'user_details': {'username': session['user'], 'email': 'user@example.com', 'phone_number': '1234567890', 'place': 'City'}
        }), 200
    return jsonify({'message': 'User not logged in.'}), 401

if __name__ == '__main__':
    init_db()  # Initialize the database
    app.run(debug=True, port=5010)
