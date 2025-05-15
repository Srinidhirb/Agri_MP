from flask import Flask, request, jsonify
import pandas as pd
from datetime import datetime, timedelta
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enables Cross-Origin Resource Sharing (CORS) for React frontend

# Load Market Data
try:
    market_df = pd.read_csv("data/market_data_2023-2024.csv", parse_dates=["Day"])
except FileNotFoundError:
    raise Exception("CSV file not found. Please make sure 'market_data_2023-2024.csv' exists in 'data/' folder.")

# Clean and prepare the DataFrame
market_df['Category'] = market_df['Category'].str.strip().str.lower()

# Cleaned categories list
raw_categories = [
    "Soyabean", "Ram", "Rose(Loose))", "Tender Coconut", "Suvarna Gadde", "Sesamum(Sesame,Gingelly,Til)", "Copra",
    "Calf", "Corriander seed", "Foxtail Millet(Navane)", "Snakeguard", "Potato", "Cowpea (Lobia/Karamani)",
    "Mustard", "White Pumpkin", "Bottle gourd", "Maize", "Ginger(Dry)", "Same/Savi", "Groundnut",
    "Elephant Yam (Suran)", "Rice", "Jowar(Sorghum)", "Dry Chillies", "Mataki", "Green Avare (W)", "Apple",
    "Cummin Seed(Jeera)", "Green Gram (Moong)(Whole)", "Coriander(Leaves)", "Chennangi Dal", "Capsicum", "Raddish",
    "Black pepper", "Beetroot", "Coconut", "Bajra(Pearl Millet/Cumbu)", "Mousambi(Sweet Lime)", "Chapparad Avare",
    "Cabbage", "She Buffalo", "Green Gram Dal (Moong Dal)", "Pomegranate", "Banana - Green", "Chilly Capsicum",
    "Methi Seeds", "Knool Khol", "Chrysanthemum(Loose)", "Brinjal", "Green Chilli", "Avare Dal", "Chili Red",
    "Sheep", "Drumstick", "Carrot", "Cotton", "Ragi (Finger Millet)", "Green Peas", "Ashgourd", "Alsandikai",
    "Garlic", "Tomato", "Honge seed", "Moath Dal", "Bitter gourd", "Bull", "Cauliflower", "Paddy(Dhan)(Common)",
    "Hybrid Cumbu", "Cucumbar(Kheera)", "Turmeric", "Ginger(Green)", "Ox", "Seemebadnekai", "Marigold(Calcutta)",
    "Neem Seed", "Thogrikai", "Tamarind Seed", "Beans", "Black Gram (Urd Beans)(Whole)", "He Buffalo",
    "Bengal Gram Dal (Chana Dal)", "Dry Grapes", "Thondekai", "Onion", "Lint", "Arhar (Tur/Red Gram)(Whole)",
    "Goat", "Arecanut(Betelnut/Supari)", "Ridgeguard(Tori)", "Cowpea(Veg)", "Cow", "Arhar Dal(Tur Dal)",
    "Sweet Pumpkin", "Castor Seed", "Ground Nut Seed", "Alasande Gram", "Sunflower", "Wheat", "Sweet Potato",
    "Bhindi(Ladies Finger)", "Kulthi(Horse Gram)", "She Goat", "Black Gram Dal (Urd Dal)", "Bengal Gram(Gram)(Whole)",
    "Antawala", "Peas Wet", "Soapnut(Antawala/Retha)", "Bunch Beans", "Safflower", "Tamarind Fruit", "Gur(Jaggery)"
]
categories = sorted(list(set([c.strip().lower() for c in raw_categories])))

@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.get_json()
    date_list = data.get("dates")
    crop = data.get("crop", "").strip().lower()

    if not date_list or not crop:
        return jsonify({"error": "Both 'dates' and 'crop' fields are required."}), 400

    try:
        input_dates = [datetime.strptime(d, "%Y-%m-%d") for d in date_list]
        filtered_df = market_df[market_df["Category"] == crop]

        if filtered_df.empty:
            return jsonify({"error": "No data found for this crop."}), 404

        prices = []

        for input_date in input_dates:
            matched_dates = []

            # Compare previous one year, same day of month for each month
            for months_ago in range(1, 13):
                try:
                    year_ago_date = input_date - pd.DateOffset(months=months_ago)
                    for delta in range(-2, 3):
                        target_date = year_ago_date + timedelta(days=delta)
                        matched_dates.append(target_date)
                except Exception:
                    continue

            match_df = filtered_df[filtered_df["Day"].isin(matched_dates)]

            if match_df.empty:
                continue

            min_price = match_df["Minimum Price"].mean()
            max_price = match_df["Maximum Price"].mean()
            modal_price = match_df["Modal Price"].mean()

            prices.append({
                "date": input_date.strftime("%Y-%m-%d"),
                "comparison_dates": [d.strftime("%Y-%m-%d") for d in matched_dates],
                "min": round(min_price, 2),
                "max": round(max_price, 2),
                "modal": round(modal_price, 2)
            })

        if not prices:
            return jsonify({"error": "No price data found for the provided dates."}), 404

        unit = filtered_df["Unit of Price"].mode()[0] if "Unit of Price" in filtered_df else "Rs/Quintal"

        return jsonify({
            "crop": crop.capitalize(),
            "unit": unit,
            "prices": prices
        }), 200

    except ValueError:
        return jsonify({"error": "Dates must be in YYYY-MM-DD format."}), 400

@app.route("/api/categories", methods=["GET"])
def get_categories():
    return jsonify(sorted(categories))

if __name__ == "__main__":
    app.run(debug=True)
