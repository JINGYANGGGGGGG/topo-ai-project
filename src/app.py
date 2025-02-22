from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd  # ✅ Import pandas
import numpy as np
from ingestion import FileIngestion
from processing import DataProcessor

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # Allow frontend

def load_processed_data():
    """Load data dynamically from ingestion and processing scripts."""
    ingestion = FileIngestion()
    raw_data = ingestion.ingest_all()

    processor = DataProcessor(raw_data)
    processed_data = processor.process_all()

    return processed_data

@app.route('/api/data')
def get_data():
    """API endpoint to serve processed data."""

    data = load_processed_data()

    # ✅ Function to convert DataFrames to JSON-serializable format
    def convert_data(obj):
        if isinstance(obj, float) and np.isnan(obj):
            return None  # Replace NaN with None (JSON null)
        if isinstance(obj, pd.Timestamp):  
            return obj.isoformat() if not pd.isna(obj) else None  # ✅ Convert NaT to None
        if isinstance(obj, pd.DataFrame):  
            return obj.fillna("").astype(str).to_dict(orient="records")  # ✅ Convert DataFrame to JSON-friendly format
        if isinstance(obj, dict):
            return {key: convert_data(value) for key, value in obj.items()}  # ✅ Handle nested dicts
        if isinstance(obj, list):
            return [convert_data(value) for value in obj]  # ✅ Handle lists
        return obj

    # ✅ Apply conversion to all data
    json_data = convert_data(data)

    return jsonify(json_data)  # ✅ Return as JSON response

if __name__ == '__main__':
    app.run(debug=True)
