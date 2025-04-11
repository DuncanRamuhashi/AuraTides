import { useState, useEffect } from "react";
import axios from "axios";
import {
  SpotifySearchResult,
  SpotifyPlaylist,
  SpotifyTrack,
  SpotifyArtist,
} from "../types/Spotify";
const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SpotifySearchResult>({});
  const [genres, setGenres] = useState<string[]>([]);
  const token = localStorage.getItem("spotify_token");

  useEffect(() => {
    if (!token) return;

    axios
      .get("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setGenres(response.data.genres);
        console.log('This recommend sess',response);
      })
      .catch((error) => {
        console.error("Error fetching genres:", error);
      });
  }, [token]);

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
      console.log('This search sess',response);
      setResults(response.data);
    } catch (error) {
      console.error("Error searching Spotify:", error);
    }
  };
console.log(token);
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
      console.log('This recommend sess fo rtracks',response);
      setResults({ tracks: { items: response.data.tracks } });
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Search Music</h1>

      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4 justify-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter genre, artist, track..."
          className="px-4 py-2 w-full sm:w-80 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
        >
          Search
        </button>
      </div>

 

 
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Playlists</h2>
          <ul className="list-disc list-inside space-y-1">
           <p> {JSON.stringify(results)} </p>
          </ul>
        </div>
      

       </div>
  );
};
export default Search;
