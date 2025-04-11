import { useState, useEffect } from "react";
import axios from "axios";
import { SpotifySearchResult, SpotifyPlaylist, SpotifyTrack, SpotifyArtist } from "../types/Spotify";

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SpotifySearchResult>({});
  const [genres, setGenres] = useState<string[]>([]);
  const token = localStorage.getItem("spotify_token");

  // Fetch available genres on mount
  useEffect(() => {
    if (!token) return;

    axios
      .get("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setGenres(response.data.genres);
      })
      .catch((error) => {
        console.error("Error fetching genres:", error);
      });
  }, [token]);

  // Handle keyword search
  const handleSearch = async () => {
    if (!token || !query) return;

    try {
      const response = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: query,
          type: "playlist,track,artist",
          limit: 10,
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error searching Spotify:", error);
    }
  };

  // Handle genre-based recommendations
  const handleGenreSearch = async (genre: string) => {
    if (!token) return;

    try {
      const response = await axios.get("https://api.spotify.com/v1/recommendations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          seed_genres: genre,
          limit: 10,
        },
      });
      setResults({ tracks: { items: response.data.tracks } });
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  // Trigger search on Enter key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Search Music</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter genre, artist, track..."
          style={{ padding: "8px", width: "300px", marginRight: "10px" }}
        />
        <button onClick={handleSearch} style={{ padding: "8px 16px" }}>
          Search
        </button>
      </div>

      {/* Genre Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Explore Genres</h3>
        <div>
          {genres.slice(0, 5).map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreSearch(genre)}
              style={{ margin: "5px", padding: "5px 10px" }}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results */}
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

      {results.artists && (
        <div>
          <h2>Artists</h2>
          <ul>
            {results.artists.items.map((artist: SpotifyArtist) => (
              <li key={artist.id}>
                {artist.name}{" "}
                {artist.genres.length > 0 && `(${artist.genres.join(", ")})`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;