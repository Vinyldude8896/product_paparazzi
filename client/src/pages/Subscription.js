import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME, QUERY_ALL_PRODUCTS } from "../utils/queries";
import { CHECKOUT } from "../utils/mutations";
import Auth from "../utils/auth";
import { LOGIN_USER } from "../utils/mutations";

const stripePromise = loadStripe(
	"pk_live_51LrWT7JEY17vHLgfhDTmuSXxuUwPmv2OypvegRRGVbzBznGWWod8tLdtsBJ83VVnAzO1aJD4ppwkkhsHYzgcKLas00fcPHnZbe"
);

const Subscription = (props) => {
	const { loading: productsLoading, data: productsData } =
		useQuery(QUERY_ALL_PRODUCTS);

	const [checkout, { errors }] = useMutation(CHECKOUT);
	const [login, { error }] = useMutation(LOGIN_USER);

	async function createCheckout() {
		console.log(productsData);
		const { data } = await checkout({
			variables: {
				products: productsData.products.map((product) => {
					return product._id;
				}),
			},
		});
		stripePromise.then((res) => {
			res.redirectToCheckout({ sessionId: data.checkout.session });
		});
	}
	const { username: userParam } = useParams();

	const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
		variables: { username: userParam },
		variablesPhotos: { photocount: useParams },
	});

	const user = data?.me || data?.user || {};

	// navigate to personal profile page if username is yours
	if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
		return <Navigate to="/profile:username" />;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

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
				<div className="card subBody">
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
							<button
								className="btn d-block w-100"
								type="submit"
								onClick={createCheckout}
							>
								Subscribe
							</button>
						</form>

						{/* {error && <div>Login failed</div>} */}
					</div>
				</div>
			</div>
		</main>
	);
};

export default Subscription;
