from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

df = pd.read_csv('ayurveda_dataset.csv')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    symptoms = data.get('symptoms', [])
    
    best_match = None
    best_score = 0
    
    for _, row in df.iterrows():
        row_symptoms = [
            str(row['symptom1']).lower(),
            str(row['symptom2']).lower(),
            str(row['symptom3']).lower()
        ]
        score = sum(1 for s in symptoms if any(s in rs for rs in row_symptoms))
        if score > best_score:
            best_score = score
            best_match = row
    
    if best_match is None:
        return jsonify({'error': 'No match found'}), 404
    
    return jsonify({
        'disease': str(best_match['disease']),
        'dosha': str(best_match['dosha']),
        'herbs': str(best_match['herbs']).split(','),
        'diet': str(best_match['diet']).split(','),
        'avoid': str(best_match['avoid']).split(','),
        'lifestyle': str(best_match['lifestyle'])
    })

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Ayurveda AI API is running!'})

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)