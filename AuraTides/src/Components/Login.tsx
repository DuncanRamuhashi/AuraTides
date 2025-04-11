import { getSpotifyAuthUrl } from "../utils/SpotifyAuth";

const Login: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Spotify Search App</h1>
      <p>Search music by genre or keyword</p>
      <a href={getSpotifyAuthUrl()}>
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>
          Login with Spotify
        </button>
      </a>
    </div>
  );
};

export default Login;