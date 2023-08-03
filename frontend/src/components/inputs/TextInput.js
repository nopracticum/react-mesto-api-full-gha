	const TextInput = ( { title, register, errors, placeholder, defaultValue }) => {
		return(
			<>
				<input
					{...register(title, {
						required: "Заполните это поле.",
						minLength: {
							value: 2,
							message: "Текст должен быть не короче 2 символов",
						},
						maxLength: 40
					})}
					id={`${title}-input`}
					type="text"
					placeholder={placeholder}
					defaultValue={defaultValue}
					className="popup__field form__input"
					autoComplete="off"
				/>
				<span className="form__error-message form__error-message_active">
					{errors?.[title] && <div>{errors?.[title]?.message}</div>}
				</span>			
			</>
		)
	}

	export default TextInput;