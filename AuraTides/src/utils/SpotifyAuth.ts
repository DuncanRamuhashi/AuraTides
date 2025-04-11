const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string;
const redirectUri = import.meta.env.VITE_REDIRECT_URI as string;
console.log("Client ID:", clientId);
console.log("Redirect URI:", redirectUri);
const scopes = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
].join(" ");

export const getSpotifyAuthUrl = (): string => {
  if (!clientId || !redirectUri) {
    throw new Error("Missing Spotify Client ID or Redirect URI");
  }
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scopes)}`;
  return authUrl;
};

export const getAccessToken = async (code: string): Promise<string | null> => {
  if (!clientId || !redirectUri) {
    throw new Error("Missing Spotify Client ID or Redirect URI");
  }
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
      }),
    });
    const data = await response.json();
    if (data.access_token) {
      return data.access_token;
    }
    throw new Error(data.error || "Failed to get access token");
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
};