import { getSpotifyAuthUrl } from "../utils/SpotifyAuth";
const Login: React.FC = () => {
  return (
    <div className="text-center mt-12">
      <h1 className="text-3xl font-bold mb-2">Spotify Search App</h1>
      <p className="text-gray-600 mb-6">Search music by genre or keyword</p>
      <a href={getSpotifyAuthUrl()}>
        <button className="px-6 py-3 text-lg bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
          Login with Spotify
        </button>
      </a>
    </div>
  );
};
export default Login;
