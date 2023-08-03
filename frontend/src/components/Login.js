import AuthForm from "./AuthForm";

function Login( { title, buttonText, authHandler, isShowLoader }) {
	if(isShowLoader) {
		return(
			<div className="container_loader">
				<span className="loader"></span>
			</div>
		)
	}
	return(
		<AuthForm
			title={title}
			buttonText={buttonText}
			authHandler={authHandler}
		/>
	)
}

export default Login;