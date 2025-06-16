import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleExtract = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:5000/extract', { text });
      setKeywords(res.data.keywords);
    } catch (err) {
      console.error(err);
      alert('Error extracting keywords');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'Arial' }}>
      <h1>Keyword Extractor</h1>
      <textarea
        rows="8"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button onClick={handleExtract} disabled={loading} style={{ padding: '0.5rem 1rem' }}>
        {loading ? 'Extracting...' : 'Extract Keywords'}
      </button>

      {keywords.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Keywords:</h2>
          <ul>
            {keywords.map((kw, idx) => (
              <li key={idx}>{kw}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;