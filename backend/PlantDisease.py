from flask import Flask, render_template, request, jsonify
import numpy as np
from keras.preprocessing import image
from keras.models import load_model
import google.generativeai as genai
from flask_cors import CORS  # To handle CORS requests

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure your API key for Gemini AI
genai.configure(api_key='AIzaSyBAOad5g0ON0BsGo9Xh2K1mZIXT7z6YKZc')

# Load the trained plant disease detection model
detection_model = load_model('./my_model.keras')

# Disease types corresponding to the model's output classes
disease_types = [
    'Strawberry__healthy', 'chilli_healthy', 'Grape__Black_rot', 'Tomato_Nitrogen Deficiency',
    'Blueberry__healthy', 'chilli_cerocospora', 'Corn(maize)healthy', 'Tomato__Target_Spot',
    'Tomato_Yellow_Leaf_Curl_Virus', 'Peach___healthy', 'Tomato_Spotted Wilt Virus', 
    'Tomato__Late_blight', 'Orange_Haunglongbing(Citrus_greening)', 'Tomato___Leaf_Mold',
    'Grape__Leaf_blight(Isariopsis_Leaf_Spot)', 'Cherry__Powdery_mildew',
    'Apple__Cedar_apple_rust', 'Tomato_Bacterial_spot', 'Grape__healthy', 'Tomato_mosaic_virus', 
    'Tomato__Early_blight', 'Corn(maize)Common_rust', 'Tomato_Pottassium Deficiency', 
    'Grape__Esca(Black_Measles)', 'Raspberry__healthy', 'Tomato__healthy', 'chilli_powdery mildew', 
    'Cherry_healthy', 'Pepper_bell__healthy', 'chilli_nutritional deficiency',
    'Apple__Apple_scab', 'Corn(maize)Northern_Leaf_Blight', 'Tomato__Spider_mites Two-spotted_spider_mite',
    'Peach__Bacterial_spot', 'Tomato_Leaf Miner', 'Tomato_Septoria_leaf_spot', 'Squash__Powdery_mildew',
    'Corn_(maize)Cercospora_leaf_spot Gray_leaf_spot', 'chilli_murda complex', 'Pepper_bell__Bacterial_spot',
    'Apple__Black_rot', 'Apple_healthy', 'Strawberry_Leaf_scorch', 'Soybean__healthy'
]

# Preprocess image for model prediction
def preprocess_image(path):
    img = image.load_img(path, color_mode='rgb', target_size=(64, 64))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)  # Add batch dimension
    x /= 255  # Normalize the image
    return x

# Predict disease using the loaded model
def predict_disease(image_path):
    x = preprocess_image(image_path)
    prediction = detection_model.predict(x)
    ind = np.argmax(prediction[0])  # Get the index of the highest probability
    return disease_types[ind]

# Get remedy suggestions from Gemini AI
def get_gemini_remedy(disease):
    input_prompt = f"""
    You are an intelligent assistant helping farmers with plant diseases. Based on the following plant disease, suggest the top 3 remedies for it. The disease is: {disease}.
    Ensure the remedies are practical and relevant to the disease.
    """
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content([disease, input_prompt])
        return response.text
    except Exception as e:
        return f"Error: {str(e)}"

# Route for handling file upload and prediction
import os

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    # Ensure the 'uploads' directory exists
    upload_folder = 'uploads'
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)

    # Save the file temporarily
    file_path = os.path.join(upload_folder, file.filename)
    file.save(file_path)

    # Predict disease
    disease = predict_disease(file_path)

    # Get remedy suggestions from Gemini AI
    remedies = get_gemini_remedy(disease)

    return jsonify({
        'prediction': disease,
        'remedies': remedies
    })


if __name__ == '__main__':
    app.run(debug=True, port=5002)  # Set the app to run on port 5002
