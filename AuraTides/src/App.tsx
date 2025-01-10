import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [url, setUrl] = useState<string>(''); // For input URL
  const [playlistData, setPlaylistData] = useState<{
    name: string;
    email: string[];
    website: string;
  } | null>(null); // For fetched playlist data
  const [error, setError] = useState<string | null>(null); // For error handling

  // Function to fetch playlist data
  const fetchPlaylistData = async (url: string) => {
    try {
      const response = await fetch(`https://api.example.com/playlist?url=${encodeURIComponent(url)}`);

      if (!response.ok) {
        throw new Error('Failed to fetch playlist data');
      }

      const data = await response.json();

      setPlaylistData({
        name: data.owner || 'Unknown',
        email: data.emails || [],
        website: url,
      });

      setError(null);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setPlaylistData(null);
    }
  };

  // Handler for fetching data
  const handleFetch = () => {
    if (!url) {
      setError('Please enter a valid playlist URL');
      return;
    }
    fetchPlaylistData(url);
  };

  return (
    <div className="font-sans bg-gray-100 min-h-screen p-6">
      <header className="flex items-center gap-4 mb-8">
        <img src={reactLogo} alt="React logo" className="w-12" />
        <img src={viteLogo} alt="Vite logo" className="w-12" />
        <h1 className="text-3xl font-bold text-gray-800">Aura Tides</h1>
      </header>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Playlist URL"
          className="w-full p-3 mb-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleFetch}
          className="w-full p-3 text-lg text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Fetch Playlist
        </button>
      </div>

      {error && <p className="text-red-500 text-center mt-4 font-semibold">{error}</p>}

      {playlistData && (
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800">Playlist Info</h2>
          <p className="text-lg text-gray-700"><strong>Owner:</strong> {playlistData.name}</p>
          <p className="text-lg text-gray-700"><strong>Website:</strong> {playlistData.website}</p>
          <p className="text-lg text-gray-700"><strong>Emails:</strong> {playlistData.email.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default App;
