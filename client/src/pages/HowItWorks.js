import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

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

	return (
		<main className="flex-row justify-center mb-4">
			<div className="col-12 col-md-6">
				<div className="card">
					<div className="card-body">
						<form onSubmit={handleFormSubmit}>
							<h3>How Does It Work?</h3>
							<p>
								What is involved in being a Product Paparazzi? It is quite
								simple, and with a great perk! Shop at your usual locations, and
								while you are there, snap a photo of our products on the
								shelves. Upload the photos to your Candid page, and after you
								have uploaded a certain amount of photos, you get a reward as a
								thank you! Rewards can be found under the "Incentives" page.
								Subscribe to our website for as little as $3 month to begin, and
								to receive more perks!
							</p>
						</form>

						{error && <div>Login failed</div>}
					</div>
				</div>
			</div>
		</main>
	);
};

export default HowItWorks;
