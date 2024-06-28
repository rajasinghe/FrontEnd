import { Link, NavLink } from "react-router-dom";
import novaLogo from "../../assets/images/Nova-dynamics-logo-removebg-preview.png";
import { useRef } from "react";

function NavBar() {
  const navBarRef = useRef<HTMLElement | null>(null);

  return (
    <nav ref={navBarRef} className={`navbar navbar-expand-xl bg-body-tertiary navbarcustom `}>
      <div className="container-fluid ">
        <Link to={`/`} className="navbar-brand">
          <img src={novaLogo} className="logo_img" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to={`/`} className="nav-link ">
                DashBoard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={``} className="nav-link">
                Users
              </NavLink>
            </li>
            <li className=" nav-item">
              <NavLink to={"products/"}>Products</NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">
                Disabled
              </a>
            </li>
          </ul>
          <Link className=" btn btn-success" to="users/login">
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
