import { useEffect, useState } from "react";
import axios from "axios";
import {
  SpotifySearchResult,
  SpotifyPlaylist,
  SpotifyTrack,
  SpotifyArtist,
} from "../types/Spotify";

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SpotifySearchResult | null>(null);
  const [genres, setGenres] = useState<string[]>([]);
  const token = localStorage.getItem("spotify_token");

  useEffect(() => {
    if (!token) return;

    axios
      .get("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setGenres(res.data.genres || []);
      })
      .catch((err) => {
        console.error("Error fetching genres:", err);
      });
  }, [token]);

  const handleSearch = async () => {
    if (!token || !query) return;

    try {
      const res = await axios.get("https://api.spotify.com/v1/search", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          q: query,
          type: "playlist,track,artist",
          limit: 10,
        },
      });

      setResults(res.data);
    } catch (err) {
      console.error("Error searching Spotify:", err);
    }
  };

  const handleGenreSearch = async (genre: string) => {
    if (!token) return;

    try {
      const res = await axios.get("https://api.spotify.com/v1/recommendations", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          seed_genres: genre,
          limit: 10,
        },
      });

      setResults({ tracks: { items: res.data.tracks } });
    } catch (err) {
      console.error("Error fetching genre recommendations:", err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Spotify Search</h1>

      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4 justify-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search by genre, artist, or track..."
          className="px-4 py-2 w-full sm:w-80 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
        >
          Search
        </button>
      </div>

      {genres.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Genres</h2>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => handleGenreSearch(genre)}
                className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded-full"
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      )}

      {results?.playlists?.items?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Playlists</h2>
          <ul className="space-y-2">
            {results.playlists.items.map((playlist: SpotifyPlaylist) => (
              <li key={playlist.id} className="border p-3 rounded-md shadow-sm">
                <div className="font-bold">{playlist.name}</div>
                <div className="text-sm text-gray-600">
                  By: {playlist.owner.display_name || playlist.owner.id}
                </div>
                <div className="text-xs text-gray-500">
                  Tracks: {playlist.tracks.total}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {results?.tracks?.items?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Tracks</h2>
          <ul className="space-y-2">
            {results.tracks.items.map((track: SpotifyTrack) => (
              <li key={track.id} className="border p-3 rounded-md shadow-sm">
                <div className="font-bold">{track.name}</div>
                <div className="text-sm text-gray-600">
                  Artist: {track.artists.map((a) => a.name).join(", ")}
                </div>
                <div className="text-xs text-gray-500">
                  Album: {track.album.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {results?.artists?.items?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Artists</h2>
          <ul className="space-y-2">
            {results.artists.items.map((artist: SpotifyArtist) => (
              <li key={artist.id} className="border p-3 rounded-md shadow-sm">
                <div className="font-bold">{artist.name}</div>
                <div className="text-sm text-gray-600">
                  Genres: {artist.genres.join(", ") || "N/A"}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
