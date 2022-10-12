
// importing react 
import React, { useEffect } from "react";
//importing the QUERY_CHECKOUT from queries
import { QUERY_CHECKOUT } from "../../utils/queries";
//importing the CartItem component
import CartItem from "../CartItem";
// importing loadstripe for our checkout with Stripe
import { loadStripe } from "@stripe/stripe-js";
//importing the useLazyQuery from the Apollo Client
import { useLazyQuery } from "@apollo/client";
// importing the idbPromise from helpers
import { idbPromise } from "../../utils/helpers";
import Auth from "../../utils/auth";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
import "./style.css";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Cart = () => {
	const [state, dispatch] = useStoreContext();
	const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

	useEffect(() => {
		if (data) {
			stripePromise.then((res) => {
				res.redirectToCheckout({ sessionId: data.checkout.session });
			});
		}
	}, [data]);

	useEffect(() => {
		async function getCart() {
			const cart = await idbPromise("cart", "get");
			dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
		}

		if (!state.cart.length) {
			getCart();
		}
	}, [state.cart.length, dispatch]);

	function toggleCart() {
		dispatch({ type: TOGGLE_CART });
	}

	function calculateTotal() {
		let sum = 0;
		//dont really need this as the price will always be $3
		state.cart.forEach((item) => {
			sum += item.price * item.purchaseQuantity;
		});
		return sum.toFixed(2);
	}

	function submitCheckout() {
		const productIds = [];

		state.cart.forEach((item) => {
			///dont really need this as there is only the subscription to add
			for (let i = 0; i < item.purchaseQuantity; i++) {
				productIds.push(item._id);
			}
		});

		getCheckout({
			variables: { products: productIds },
		});
	}

	if (!state.cartOpen) {
		return (
			<div className="cart-closed" onClick={toggleCart}>
				<span role="img" aria-label="trash">
					🛒
				</span>
			</div>
		);
	}

	return (
		<div className="cart">
			<div className="close" onClick={toggleCart}>
				[close]
			</div>
			<h2>Shopping Cart</h2>
			{state.cart.length ? (
				<div>
					{state.cart.map((item) => (
						<CartItem key={item._id} item={item} />
					))}

					<div className="flex-row space-between">
						<strong>Total: ${calculateTotal()}</strong>

						{Auth.loggedIn() ? (
							<button onClick={submitCheckout}>Checkout</button>
						) : (
							<span>(log in to check out)</span>
						)}
					</div>
				</div>
			) : (
				<h3>
					<span role="img" aria-label="shocked">
						😱
					</span>
					You haven't subscribed yet!
				</h3>
			)}
		</div>
	);
};

export default Cart;
