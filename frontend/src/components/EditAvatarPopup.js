import { useForm } from "react-hook-form";

import PopupWithForm from "./PopupWithForm";
import UrlInput from "./inputs/UrlInput";


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

	const { 
		register,
		reset, 
		handleSubmit,
		isValid,
		formState: { errors } 
	} = useForm({ mode: "onChange" });

	function submitData(data) {
		onUpdateAvatar(data);
		reset();
	}

	return (
		<PopupWithForm
			name="userpic"
			title="Обновить изображение профиля"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit(submitData)}
			buttonText="Обновить"
			isLoading={isLoading}
			isValid={!isValid}
			>
			<UrlInput
				title="avatar" 
				register={register} 
				errors={errors}
				placeholder="Ссылка на изображение" 
			/>
		</PopupWithForm>
	)
}

export default EditAvatarPopup;