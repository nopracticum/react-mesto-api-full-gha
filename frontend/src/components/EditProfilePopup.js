import { useContext } from "react";
import { useForm } from "react-hook-form";	

import PopupWithForm from "./PopupWithForm.js"
import { CurrentUserContext } from "../contexts/Contexts.js";
import TextInput from "./inputs/TextInput"

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const { 
    register,
    handleSubmit,
		reset,
		isValid, 
    formState: { errors } 
  } = useForm({ mode: "onChange" });

  function submitData(data) {
    onUpdateUser(data);
		reset();
  }
	
	return (
		<PopupWithForm
			name="profile"
			title="Редактировать профиль"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit(submitData)}
			buttonText="Сохранить"
			isLoading={isLoading}
			isValid={!isValid}
			>
				<TextInput
					title='title'
					register={register}
					errors={errors}
					defaultValue={currentUser.name}
				/>
				<TextInput
					title='about'
					register={register}
					errors={errors}
					defaultValue={currentUser.about}
				/>
		</PopupWithForm>
	)
}

export default EditProfilePopup;