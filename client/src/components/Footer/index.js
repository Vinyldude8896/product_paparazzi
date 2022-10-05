import React from "react";

const Footer = () => {
	return (
		<footer className="w-100 mt-auto bg-secondary p-4">
			<div id="style.footer" className="container">
				&copy;{new Date().getFullYear()} Created by Alexandre Savov | Fumi
				Tsukamoto | Michelle Douma | Kevin Reid
			</div>
		</footer>
	);
};

export default Footer;
