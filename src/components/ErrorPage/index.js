import Error from "../../assets/error.png";
import "./Error.scss";

const ErrorPage = () => {
	return (
		<div className="error-page" id="error-page">
			<img src={Error} alt="suitability-not-found" />
			<h1>Oops!</h1>
			<p>Page not found, an unexpected error has occurred.</p>
		</div>
	);
};

export default ErrorPage;
