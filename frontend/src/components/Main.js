import { useContext } from "react";
import { CurrentUserContext } from "../contexts/Contexts.js";

import Card from "./Card.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
  isShowLoader
}) {

  const currentUser = useContext(CurrentUserContext);

  if(isShowLoader) {
		return(
			<div className="container_loader">
				<span className="loader"></span>
			</div>
		)
	}
  return (
    <main className="main">
       <section className="profile">
        <div className="profile__container">
        <div className="profile__edit-avatar">
            <div
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
              className="profile__avatar"
              onClick={onEditAvatar}
            ></div>
          </div>
          <div className="profile__info">
            <h1 className="profile__info-title">{currentUser.name}</h1>
            <p className="profile__info-subtitle">{currentUser.about}</p>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            ></button>
          </div>
        </div>
        <button
          className="profile__button"
          aria-label="Добавить"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
