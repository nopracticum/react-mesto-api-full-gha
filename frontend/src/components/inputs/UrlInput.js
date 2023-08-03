const UrlInput = ( { title, register, errors, placeholder }) => {
	return(
		<>
			<input
				{...register(title, {
					required: "Заполните это поле.",
					pattern: {
						value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
						message: 'Введите адрес URL, он должен начинаться с https://'
					}
				})}
				id={`${title}-input`}
				type="url"
				placeholder={placeholder}
				className="popup__field form__input"
			/>
			<span className="form__error-message form__error-message_active">
				{errors?.[title] && <div>{errors?.[title]?.message}</div>}
			</span>			
		</>
	)
}

export default UrlInput;