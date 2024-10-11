import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks'; // Import typed hooks
import { fetchTranscript } from './actions';

const App: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isDetailed, setIsDetailed] = useState(false);
  const dispatch = useAppDispatch(); // Typed dispatch hook
  const transcriptData = useAppSelector((state) => state.transcript.transcriptData); // Typed selector hook
  const error = useAppSelector((state) => state.transcript.error); // Typed selector hook
  const [isCopied, setIsCopied] = useState(false); // State to manage the copy status

  const handleSubmit = () => {
    dispatch(fetchTranscript(url, isDetailed));
  };

  // Function to copy the transcript content to the clipboard
  const handleCopy = async () => {
    if (transcriptData) {
      try {
        await navigator.clipboard.writeText(JSON.stringify(transcriptData, null, 2)); // Copy to clipboard
        setIsCopied(true); // Set copied status to true
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  return (
    <div>
      <h1>YouTube Transcript Fetcher</h1>

      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={isDetailed}
          onChange={() => setIsDetailed(!isDetailed)}
        />
        Detailed Transcript
      </label>

      <button onClick={handleSubmit}>Fetch Transcript</button>

      <div>
        <h3>Transcript Result</h3>
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <textarea
            value={transcriptData ? JSON.stringify(transcriptData, null, 2) : ''}
            readOnly
            rows={10}
            cols={80}
          />
        )}
      </div>
      <button
        onClick={handleCopy}
        disabled={!transcriptData} // Disable button if textarea is empty
        style={{ marginTop: '10px' }}
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default App;
