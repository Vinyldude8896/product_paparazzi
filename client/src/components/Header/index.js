import React from "react";
import { Link } from "react-router-dom";
import PaparazziLogo from "../../images/PaparazziLogo.png";

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
<<<<<<< HEAD
					<h1>Product Paparazzi</h1>
=======
					<img className="logo" src={PaparazziLogo} alt="camera with logo" />
>>>>>>> feature/html
				</Link>
				<div class="bg-text">
					<h2>Help Your Favourite Brand and Be Rewarded</h2>
				</div>

				<nav className="text-center">
					{Auth.loggedIn() ? (
						<>
            <Link to="/Incentives">My Incentives</Link>
							<Link to="/profile">My Candids</Link>
							<a href="/" onClick={logout}>
								Logout
							</a>
						</>
					) : (
						<>
							<Link to="/incentive">Incentive</Link>
							<Link to="/howitworks">How It Works</Link>
							<span className="line">|</span>
							<Link to="/login">Login</Link>
							<Link to="/signup">Signup</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Header;
