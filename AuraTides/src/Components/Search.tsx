import { useState, useEffect } from "react";
import axios from "axios";
import { SpotifySearchResult, SpotifyPlaylist, SpotifyTrack, SpotifyArtist } from "../types/Spotify";

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SpotifySearchResult>({});
  const token = localStorage.getItem("spotify_token");

  const handleSearch = async () => {
    if (!token || !query) return;

    try {
      const response = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: query, // e.g., "pop" or "artist:Drake"
          type: "playlist,track,artist", // Search multiple types
          limit: 10,
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error searching Spotify:", error);
    }
  };

  // Optional: Trigger search on Enter key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <h1>Search Spotify</h1>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter genre, artist, or track..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Display Playlists */}
      {results.playlists && (
        <div>
          <h2>Playlists</h2>
          <ul>
            {results.playlists.items.map((playlist: SpotifyPlaylist) => (
              <li key={playlist.id}>
                {playlist.name} (Owner: {playlist.owner.display_name || playlist.owner.id})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Tracks */}
      {results.tracks && (
        <div>
          <h2>Tracks</h2>
          <ul>
            {results.tracks.items.map((track: SpotifyTrack) => (
              <li key={track.id}>
                {track.name} by {track.artists.map((artist) => artist.name).join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Artists */}
      {results.artists && (
        <div>
          <h2>Artists</h2>
          <ul>
            {results.artists.items.map((artist: SpotifyArtist) => (
              <li key={artist.id}>
                {artist.name} {artist.genres.length > 0 && `(${artist.genres.join(", ")})`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;