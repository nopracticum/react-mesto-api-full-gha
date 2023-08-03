import { useContext } from "react";
import { OverlayClickContext } from "../contexts/Contexts";

function ImagePopup({ card, isOpen, onClose }) {
	const handleOverlayClick = useContext(OverlayClickContext);

	return(
		<div className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`} onClick={handleOverlayClick} >
			<figure className="popup__container-image overlay">
					<button 
						className="popup__close-button" 
						aria-label="Закрыть" 
						type="button"
						onClick={onClose}
						>
					</button>
					<div className="popup__container-wrap">
							<img className="popup__image" src={card.link} alt={card.name}/>
							<figcaption className="popup__figcaption">{card.name}</figcaption>
					</div>
			</figure>
		</div>
	)
}

export default ImagePopup;