import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to="/">
        <p id="appname">Customer Admin Panel</p>
      </Link>
    </header>
  );
}

export default Header;
