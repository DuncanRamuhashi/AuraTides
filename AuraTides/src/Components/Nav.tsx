import { Link } from "react-router-dom";

const Nav: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/playlists">Your Playlists</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;