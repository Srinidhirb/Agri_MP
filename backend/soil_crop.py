from flask import Flask, request, jsonify
from flask_cors import CORS  # Importing CORS
import pandas as pd
import pickle

# Enable CORS for cross-origin requests
app = Flask(__name__)
CORS(app)  # This will allow all origins by default

# Load the Agricultural Predictor class and the trained model
class AgriculturalPredictor:
    def __init__(self):
        self.crop_classifier = None
        self.fertility_classifier = None
        self.scaler = None
        self.label_encoder = None
        self.feature_names = [
            "N", "P", "K", "ph", "B", "Zn", "Cu", "Fe",
            "temperature", "humidity", "rainfall"
        ]

    @classmethod
    def load_model(cls, filename):
        with open(filename, "rb") as file:
            model_data = pickle.load(file)
        predictor = cls()
        predictor.crop_classifier = model_data["crop_classifier"]
        predictor.fertility_classifier = model_data["fertility_classifier"]
        predictor.scaler = model_data["scaler"]
        predictor.label_encoder = model_data["label_encoder"]
        return predictor

    def predict_crop(self, input_data):
        input_data = pd.DataFrame([input_data], columns=self.feature_names)
        scaled_data = self.scaler.transform(input_data)
        crop_pred = self.crop_classifier.predict(scaled_data)
        return self.label_encoder.inverse_transform(crop_pred)[0]

    def analyze_soil_fertility(self, input_data):
        input_data = pd.DataFrame([input_data], columns=self.feature_names)
        scaled_data = self.scaler.transform(input_data)
        fertility_pred = self.fertility_classifier.predict(scaled_data)[0]
        fertility_pred_str = "High" if fertility_pred == 2 else "Medium" if fertility_pred == 1 else "Low"
        recommendations = []
        if fertility_pred == 0:  # Low
            original_values = input_data.iloc[0]
            if original_values["N"] < 60:
                recommendations.append("Increase Nitrogen (N) using nitrogen-rich fertilizers.")
            if original_values["P"] < 30:
                recommendations.append("Add Phosphorus (P) using phosphate fertilizers.")
            if original_values["K"] < 30:
                recommendations.append("Supplement Potassium (K) using potash fertilizers.")
            if original_values["ph"] < 6.0:
                recommendations.append("Add lime to increase pH.")
            elif original_values["ph"] > 8.0:
                recommendations.append("Add sulfur to decrease pH.")
        return fertility_pred_str, recommendations


# Flask app setup
predictor = AgriculturalPredictor.load_model("./agricultural_predictor_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        input_data = request.json  # Expecting JSON data

        # Convert all string inputs to float
        input_data = {key: float(value) for key, value in input_data.items()}

        predicted_crop = predictor.predict_crop(input_data)
        fertility_status, recommendations = predictor.analyze_soil_fertility(input_data)

        results = {
            "crop": predicted_crop,
            "fertility": fertility_status,
            "recommendations": recommendations,
        }
        return jsonify(results)
    except Exception as e:
        return jsonify({"error": str(e)})



if __name__ == "__main__":
    app.run(debug=True,  port=5001)  # Running on port 5000
