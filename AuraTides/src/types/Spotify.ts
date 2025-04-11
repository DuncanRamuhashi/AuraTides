export interface SpotifyUser {
    id: string;
    display_name?: string;
    email?: string;
  }
  
export interface SpotifyPlaylist {
    id: string;
    name: string;
    owner: {
      id: string;
      display_name?: string;
      email?: string;
    };
    tracks: {
      href: string;
      total: number;
    };
  }
  
export interface SpotifyTrack {
    id: string;
    name: string;
    artists: { name: string }[];
    album: { name: string };
  }
  
export interface SpotifyArtist {
  id: string;
    name: string;
    genres: string[];
  }
  
export interface SpotifySearchResult {
    playlists?: {
      items: SpotifyPlaylist[];
    };
    tracks?: {
      items: SpotifyTrack[];
    };
    artists?: {
      items: SpotifyArtist[];
    };
  }