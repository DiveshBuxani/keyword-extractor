from flask import Flask, request, jsonify
from flask_cors import CORS
from keybert import KeyBERT

app = Flask(__name__)
CORS(app)
#initializes the Flask app and enables CORS globally so that requests from React or other frontends are accepted.

model = KeyBERT() #loads the KeyBERT model for keyword extraction

@app.route('/extract', methods=['POST'])
def extract_keywords():
    data = request.get_json()
    text = data.get('text', '')
    #parses incoming JSON and extracts the text field

    if not text:
        return jsonify({'error': 'No text provided'}), 400
    #if no text is provided, return error

    word_list = text.split()
    if len(word_list) < 10:
        keywords = model.extract_keywords(text, keyphrase_ngram_range=(1, 2), stop_words='english', top_n=5)
    elif len(word_list) >= 10 and len(word_list) < 15:
        keywords = model.extract_keywords(text, keyphrase_ngram_range=(1, 2), stop_words='english', top_n=7)
    else:
        keywords = model.extract_keywords(text, keyphrase_ngram_range=(1, 2), stop_words='english', top_n=10)
    #this series of if-else statements is for displaying the number of keywords extracted. the choice of 5, 7 and 10 keywords is just arbritary depending on the size of the text and can be changed

    return jsonify({'keywords': [kw[0] for kw in keywords]})

if __name__ == '__main__':
    app.run(debug=True)