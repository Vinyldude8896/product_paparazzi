import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Subscription = (props) => {
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
							<h3>Benefits of Subscribing!</h3>
							<p>
								Subscribing to our website has a lot of perks that make it
								worthwhile! For as little as the cost of one coffee a month, you
								save so much money! Not only do you receive discounts on all of
								our products (and more!), but you will also receive our
								newsletter that contains recipes, updates about our store, new
								locations where you can buy our products, gift ideas, first
								knowledge of our sales, and so much more! Thank you for being a
								part of this community!
							</p>
							<button className="btn d-block w-100" type="submit">
								Submit
							</button>
						</form>

						{error && <div>Login failed</div>}
					</div>
				</div>
			</div>
		</main>
	);
};

export default Subscription;
