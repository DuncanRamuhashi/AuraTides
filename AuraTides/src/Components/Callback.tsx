import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getAccessToken } from "../utils/SpotifyAuth";

const Callback: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    if (code) {
      getAccessToken(code).then((token) => {
        if (token) {
          localStorage.setItem("spotify_token", token);
          history.push("/search");
        } else {
          history.push("/");
        }
      });
    } else {
      history.push("/");
    }
  }, [location, history]);

  return <div>Loading...</div>;
};

export default Callback;