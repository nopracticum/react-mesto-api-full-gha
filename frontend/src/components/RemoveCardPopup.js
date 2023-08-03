import PopupWithForm from "./PopupWithForm";

function RemoveCardPopup({ isOpen, isLoading, onClose, onHandleRemoveCard, cardToDelete }) {

		const handleSubmit = (evt) => {
			evt.preventDefault();
			onHandleRemoveCard(cardToDelete);
			onClose();
		};

	return(
		<PopupWithForm
			name='delete-card'
			title="Вы уверены?"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			buttonText="Удалить"
			isLoading={isLoading}
			isValid={true}
		/>
	)
}

export default RemoveCardPopup;