import { Link, NavLink } from "react-router-dom";
import novaLogo from "../../../assets/images/Nova-dynamics-logo-removebg-preview.png";
import { SetStateAction, useEffect, useRef } from "react";
import styles from "../nav.module.css";
interface Navabar {
  setNavBarInfo: (state: SetStateAction<DOMRect | null>) => void;
}

function NavBar({ setNavBarInfo }: Navabar) {
  const navBarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    //setting the global navbar info after intial render
    console.log("intitial render of the nav bar component");
    setGlobalNavBarInfo();
  }, []);

  window.addEventListener("resize", () => {
    //setting the gllobal navbar info whenever the window is resized
    setGlobalNavBarInfo();
  });

  /* 
  the function to set the global navabar component to the 
  navabar components current layout postioning information
  */
  const setGlobalNavBarInfo = () => {
    const rect = navBarRef.current?.getBoundingClientRect();
    rect && setNavBarInfo(rect);
  };

  return (
    <nav ref={navBarRef} className={`navbar navbar-expand-md bg-body-tertiary `}>
      <div className="container-fluid ">
        <Link to={`/`} className="navbar-brand">
          <img src={novaLogo} className={styles.logo_img} />
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
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`products`} className="nav-link">
                Products
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">
                Disabled
              </a>
            </li>
          </ul>
          <Link className=" btn btn-success" to="/login">
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
