import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ loggedIn, userEmail, handleLogOut, toggleMenu, menuOpen }) {
  const url = useLocation();
  const path = url.pathname === "/sign-in" ? "/sign-up" : "/sign-in";
  const linkTitle = url.pathname === "/sign-in" ? "Регистрация" : "Войти";

	return (
    <>
      {loggedIn && (
        <div className={`header_line header__mobile-container ${!menuOpen ? "hidden" : ""}`}>
          <p className="header__email">{userEmail}</p>
          <button className="header__link" onClick={handleLogOut} style={{ fontSize: 18 }}>
            Выйти
          </button>
        </div>
      )}
      <header className="header">
        <img src={logo} alt="Логотип" className="header__logo" />
        {loggedIn && (
          <>
            <div className="burger-menu" onClick={toggleMenu}>
              <div className="burger-menu__bar"></div>
              <div className="burger-menu__bar"></div>
              <div className="burger-menu__bar"></div>
            </div>
            <div className={`header__container ${!menuOpen ? "hidden" : ""}`}>
              <p className="header__email">{userEmail}</p>
              <button className="header__link" onClick={handleLogOut}>
                Выйти
              </button>
            </div>
          </>
        )}
        {!loggedIn && (<Link className="header__link" to={path}>{linkTitle}</Link>)}
      </header>
    </>
  );
}

export default Header;