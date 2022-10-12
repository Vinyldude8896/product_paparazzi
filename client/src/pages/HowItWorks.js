import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import workBackgroundImage from "../images/photoMug.jpg";

import Auth from "../utils/auth";

const HowItWorks = (props) => {
	const [login, { error }] = useMutation(LOGIN_USER);

	// submit form
	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const { data } = await login({
				// variables: { ...formState },
			});

			Auth.login(data.login.token);
		} catch (e) {
			console.error(e);
		}
	};

	const loggedIn = Auth.loggedIn();

	return (
		<main className="flex-row justify-center mb-4">
			<div className="works">
				{!loggedIn && (
					<div>
						<img
							className="worksBackgroundImage"
							src={workBackgroundImage}
							alt="pic being taken of mug"
						/>
					</div>
				)}

				<div className="card howBody">
					<div className="card-body ">
						<h3 className="howTitle">
							<b>How Does It Work?</b>
						</h3>
						<p className="howTitle">
							What is involved in being a Product Paparazzi? <br></br>
							<br></br>It is quite simple, and with a great perk! Shop at your
							usual locations, and while you are there, snap a photo of our
							products on the shelves.<br></br>
							<br></br>Upload the photos to your Candid page, and after you have
							uploaded a certain amount of photos, you get a reward as a thank
							you!<br></br>
							<br></br>Rewards can be found under the "Incentives" page.{" "}
							<br></br>
							<br></br>Subscribe to our website for as little as $3 month to
							begin, and to receive more perks!
						</p>

						{error && <div>Login failed</div>}
					</div>
				</div>
			</div>
		</main>
	);
};

export default HowItWorks;
