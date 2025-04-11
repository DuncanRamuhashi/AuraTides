import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAccessToken } from "../utils/SpotifyAuth";
const Callback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    if (code) {
      getAccessToken(code).then((token) => {
        if (token) {
          localStorage.setItem("spotify_token", token);
          navigate("/search");
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  return <div>Loading...</div>;
};

export default Callback;
