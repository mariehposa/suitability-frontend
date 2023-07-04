import logo from "../../assets/logo.png";
import "./Header.scss"

const Header = () => {
	return (
		<div className="header">
			<img src={logo} alt="suitability-logo" />
			<p>Suitability</p>
		</div>
	);
};

export default Header;
