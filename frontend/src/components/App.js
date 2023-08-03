import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/Api.js";
import { CurrentUserContext, OverlayClickContext, ShowSavingBtnContext } from "../contexts/Contexts.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import * as auth from "../utils/Auth.js";
import RemoveCardPopup from "./RemoveCardPopup.js";

function App() {
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isRemoveCardPopup, setIsRemoveCardPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [registred, setRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isShowLoader, setisShowLoader] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
	const showFooter = location.pathname !== '/sign-in' && location.pathname !== '/sign-up';

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
  
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);  

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserDataApi(), api.getInitialCardsApi()])
        .then(([userData, cardsData]) => {
          setisShowLoader(false);
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch(err => console.log(err));
    }
  }, [loggedIn]);

  function handleRegister({ email, password }) {
    auth
      .register(email, password)
      .then(() => {
        setRegister(true);
        setInfoTooltipOpen(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        setInfoTooltipOpen(true);
        console.log(`Возникла ошибка ${err}`);
      });
  }

  function handleLogin({ email, password }) {
    auth
      .authorize({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          setUserEmail(email);
          navigate("/");
        }
      })
      .catch((err) => {
        setInfoTooltipOpen(true)
        console.log(err);
      });
  }

  function handleLogOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setMenuOpen(!menuOpen);
    navigate("/sign-in");
  }

  function handleTokenCheck() {
    const token = localStorage.getItem("token");

    if (token) {
      auth
        .checkToken(token)
        .then((user) => {
          if (user) {
            const curentUserEmail = user.email;
            setLoggedIn(true);
            navigate("/", { replace: true });
            setUserEmail(curentUserEmail);
          }
        })
        .catch(err => console.log(err));
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleUpdateAvatar(data) {
    api
      .changeUserAvatarApi(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(data) {
    api
      .changeUserDataApi(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    api
      .addCardApi(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleCardLike(card) {
    const isCurrentUserLiked = card.likes.some(
      (like) => like === currentUser._id
    );
    api
      .changeLikeCardStatus(card._id, !isCurrentUserLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch(err => console.log(err));
  }

  function handleRemoveCard(card) {
    api
      .deleteCardApi(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch(err => console.log(err));
  }

  function handleEscapeKey(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function openRemoveCardPopup(card) {
    setSelectedCard(card);
    setIsRemoveCardPopup(true);
  }

  function closeAllPopups() {
    setAvatarPopupOpen(false);
    setProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setInfoTooltipOpen(false);
    setIsRemoveCardPopup(false);
    setRegister(false);
  }

  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  function showSavingBtn() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  const toggleBurgerMenu = () => {
    setMenuOpen(!menuOpen);
  };



  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
          userEmail={userEmail}
          handleLogOut={handleLogOut}
          toggleMenu={toggleBurgerMenu}
          menuOpen={menuOpen}
        />
        <Routes>
          <Route path="*" element={ 
              loggedIn ? (<Navigate to="/" />) : (<Navigate to="/sign-in" replace />)
            }
          />
          <Route path="/sign-up" element={
              <Register
                title="Регистрация"
                buttonText="Зарегестрироваться"
                authHandler={handleRegister}
              />
            }
          />
          <Route path="/sign-in" element={
              <Login
                title="Войти"
                buttonText="Войти" 
                authHandler={handleLogin}
              />
            }
          />
          <Route path="/" element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={openRemoveCardPopup}
                cards={cards}
              />
            }
          />
        </Routes>
        {showFooter && !isShowLoader && <Footer />}
        <OverlayClickContext.Provider value={handleOverlayClick}>
          <ShowSavingBtnContext.Provider value={showSavingBtn}>
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              isLoading={isLoading}
            />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              isLoading={isLoading}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              isLoading={isLoading}
            />
            <ImagePopup
              card={selectedCard}
              isOpen={isImagePopupOpen}
              onClose={closeAllPopups}
            />
            <InfoTooltip
              name="infoTooltip"
              successTitle="Вы успешно зарегистрировались!"
              deniedTitle="Что-то пошло не так! Попробуйте ещё раз"
              altSuccess="Вы успешно зарегистрировались!"
              altDenied="Что-то пошло не так! Попробуйте ещё раз"
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
              registred={registred}
              handleOverlayClick={handleOverlayClick}
            />
            <RemoveCardPopup
              isOpen={isRemoveCardPopup}
              onClose={closeAllPopups}
              onHandleRemoveCard={handleRemoveCard}
              cardToDelete={selectedCard}
              isLoading={isLoading}
            />            
          </ShowSavingBtnContext.Provider>
        </OverlayClickContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;