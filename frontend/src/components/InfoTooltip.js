import successLogo from '../images/success.svg';
import deniedLogo from '../images/denied.svg'

function InfoTooltip({ 
	name, 
	isOpen, 
	onClose, 
	registred, 
	handleOverlayClick, 
	successTitle, 
	deniedTitle,
	altSuccess,
	altDenied
}) {
	return (
		<div className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`} onClick={handleOverlayClick} >
			<div className="popup__container overlay">
				<button
					className="popup__close-button"
					aria-label="Закрыть"
					type="button"
					onClick={onClose} />
				{registred ? (
					<>
						<img className="popup__image_infotooltip" src={successLogo} alt={altSuccess} />
						<p className="popup__title_infotooltip">{successTitle}</p>
					</>
				) : (
					<>
						<img className="popup__image_infotooltip" src={deniedLogo} alt={altDenied} />
						<p className="popup__title_infotooltip">{deniedTitle}</p>
					</>
				)
				}
			</div>
		</div>
	)
}

export default InfoTooltip;