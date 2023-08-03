import { useContext } from "react";
import { CurrentUserContext } from "../contexts/Contexts.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
	const currentUser = useContext(CurrentUserContext);
	const isOwn = card.owner === currentUser._id;
	const isLiked = card.likes.some(like => like === currentUser._id);
	const cardLikeButtonClassName = (`card__like ${isLiked && 'card__like_active'}`); 


	function handleClick() {
		onCardClick(card);
	}

	function handleLikeClick() {
		onCardLike(card);
	}

	function handleDeleteClick() {
		onCardDelete(card);
	}

	return (
		<div className="card">
			{isOwn && <button className="card__trash-button" type="button" alt="Удалить карточку" onClick={handleDeleteClick} ></button>}
			<img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
			<div className="card__description">
				<h2 className="card__title">{card.name}</h2>
				<div className="card__like-container">
					<button 
						className={cardLikeButtonClassName} 
						type="button" 
						alt="Нравится" 
						onClick={handleLikeClick}>
					</button>
					<p className="card__like-count">{card.likes.length}</p>
				</div>
			</div>
		</div>
	)
}

export default Card;