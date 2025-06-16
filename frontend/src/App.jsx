import React, { useState } from 'react';
import axios from 'axios';
//I use axios here which is a promise-based http client used to make API requests


function App() {
  const [text, setText] = useState(''); //text stores the user input from the text area
  const [keywords, setKeywords] = useState([]); //stores the extracted keywords returned from the API
  const [loading, setLoading] = useState(false); //keyword is a boolean flag indicating whether the keyword extraction is in progress 

  const handleExtract = async () => {
    //validates that the text is not empty
    if (!text.trim()) return;
    
    //sends a POST request to the backend with { text } as the payload
    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:5000/extract', { text });
      setKeywords(res.data.keywords);
      //on success, updates keywords with the response
    } catch (err) {
      console.error(err);
      alert('Error extracting keywords');
    }
    setLoading(false);

    //toggles loading state during the async call
  };

  return (
    //main container with basic styling
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'Arial' }}>
      <h1>Keyword Extractor</h1>
      <textarea
        rows="8"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      {/* controlled component tied to text state*/}
      <button onClick={handleExtract} disabled={loading} style={{ padding: '0.5rem 1rem' }}>
        {loading ? 'Extracting...' : 'Extract Keywords'}
      </button>
      {/* triggers keyword extraction and displays loading state during fetch*/}

      {keywords.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Keywords:</h2>
          <ul>
            {keywords.map((kw, idx) => (
              <li key={idx}>{kw}</li>
            ))}
          </ul>
          {/* conditionally renders the list if any are returned */}
        </div>
      )}
    </div>
  );
}

export default App;