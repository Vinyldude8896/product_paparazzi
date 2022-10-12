import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="bg-secondary p-4">
			<div className="contact">
				<Link to="/Contact">Contact Us</Link>
			</div>
			<div className="container foot">
				&copy;{new Date().getFullYear()} Created by Alexandre Savov | Fumi
				Tsukamoto | Michelle Douma | Kevin Reid
			</div>
		</footer>
		////change ////
	);
};

export default Footer;
