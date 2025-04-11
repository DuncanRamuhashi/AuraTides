import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-center space-x-6">
        <li>
          <Link
            to="/playlists"
            className="text-white hover:text-green-400 transition duration-200"
          >
            Your Playlists
          </Link>
        </li>
        <li>
          <Link
            to="/search"
            className="text-white hover:text-green-400 transition duration-200"
          >
            Search
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
