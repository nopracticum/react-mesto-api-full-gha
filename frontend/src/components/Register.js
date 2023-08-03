import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register({ title, buttonText, authHandler }) {
  return(
    <>
      <AuthForm
        title={title}
        buttonText={buttonText}
        authHandler={authHandler}
      />
      <p className="signup__question">
        Уже зарегестрированы? 
        <Link to="/sign-in" className="signup__link">&nbsp; Войти</Link>
      </p>
    </>
  )
}

export default Register;