import { useForm } from "react-hook-form";

function AuthForm({ title, buttonText, authHandler }) {
  const requiredMessage = "Заполните это поле.";
  const minLengthMessage = "Минимум 3 символа";
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  const emailMinLengthMessage = "Минимум 6 символов";
  const emailMaxLenghtMessage = "Электронная почта должна содержать не более 40 символов";
  const emailPatternMessage = "Адрес электронной почты должен содержать символ ' @ ' ";

  const {
    register, 
    resetField,
    handleSubmit,
    formState: { errors, isValid } 
  } = useForm({ mode: "onChange" });

  const submitData = (data) => {
    authHandler(data);
    resetField();
  };

  return (
    <div className="signup">
      <h2 className="signup__title">{title}</h2>
      <form 
        className="signup__form" 
        name="form__login" 
        onSubmit={handleSubmit(submitData)} 
        autoComplete="on"
      >
        <input
          {...register("email", {
            required: requiredMessage,
            minLength: {
              value: 6,
              message: emailMinLengthMessage,
            },
            maxLength: {
              value: 40,
              message: emailMaxLenghtMessage,
            },
            pattern: {
              value: emailRegex,
              message: emailPatternMessage,
            },
          })}
          id="email"
          type="email"
          placeholder="Email"
          className="signup__input"
          autoComplete="email"
        />
        <div className="form__error-message form__error-message_active">
          {errors?.email && <div>{errors?.email?.message}</div>}
        </div>
        <input
          {...register("password", {
            required: requiredMessage,
            minLength: {
              value: 3,
              message: minLengthMessage
            },
            maxLength: 40,
          })}          
          id="password"
          type="password"
          placeholder="Пароль"
          className="signup__input"
          autoComplete="current-password"
        />
        <div className="form__error-message form__error-message_active">
          {errors?.password && <div>{errors?.password?.message}</div>}
        </div>        
        <button
          className="signup__button"
          type="submit"
          disabled={!isValid}
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;