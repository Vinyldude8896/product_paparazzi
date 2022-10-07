import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="w-100 bg-secondary p-4">
			<div className="contact">
				<Link to="/contact">Contact Us</Link>
			</div>
			<div className="container foot">
				&copy;{new Date().getFullYear()} Created by Alexandre Savov | Fumi
				Tsukamoto | Michelle Douma | Kevin Reid
			</div>
		</footer>
	);
};

export default Footer;
