import React from "react";
import { Link } from "react-router-dom";
import PaparazziLogo from "../../images/PrPalogo.png";

import Auth from "../../utils/auth";

const Header = () => {
	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};

	return (
		<header className="bg-secondary py-2 flex-row align-center">
			<div className="container flex-row justify-space-between-lg justify-center align-center">
				<Link to="/">
					<img className="logo" src={PaparazziLogo} alt="camera with logo" />
				</Link>
				<nav className="text-center">
					{Auth.loggedIn() ? (
						<>
							<Link to="/upload-candid">Upload Candid</Link>
							<Link to="/Incentives">My Incentives</Link>
							<Link to="/Subscription">Subscription</Link>
							<Link to="/profile">My Candids</Link>
							<span className="line">|</span>
							<a href="/" onClick={logout}>
								Logout
							</a>
						</>
					) : (
						<>
							{/* <Link to="/incentive">Incentives</Link> */}
							<Link to="/howitworks">How It Works</Link>
							<Link to="/signup">Signup</Link>
							<span className="line">|</span>
							<Link to="/login">Login</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Header;
