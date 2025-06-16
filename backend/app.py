from flask import Flask, request, jsonify
from flask_cors import CORS
from keybert import KeyBERT

app = Flask(__name__)
CORS(app)

model = KeyBERT()

@app.route('/extract', methods=['POST'])
def extract_keywords():
    data = request.get_json()
    text = data.get('text', '')

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    keywords = model.extract_keywords(text, keyphrase_ngram_range=(1, 2), stop_words='english', top_n=10)
    return jsonify({'keywords': [kw[0] for kw in keywords]})

if __name__ == '__main__':
    app.run(debug=True)