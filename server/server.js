const stripe = require("stripe")("sk_test_Hrs6SAopgFPF0bZXSN3f6ELN");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authMiddleware,
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../client/public/index.html"));
	});
}

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
	await server.start();
	server.applyMiddleware({ app });

	db.once("open", () => {
		app.listen(PORT, () => {
			console.log(`API server running on port ${PORT}!`);
			console.log(
				`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
			);
		});
	});
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.

const YOUR_DOMAIN = "http://localhost:3000";

app.post("/create-checkout-session", async (req, res) => {
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
				price: "{{PRICE_ID}}",
				quantity: 1,
			},
		],
		mode: "payment",
		success_url: `${YOUR_DOMAIN}?success=true`,
		cancel_url: `${YOUR_DOMAIN}?canceled=true`,
	});

	res.redirect(303, session.url);
});

app.listen(3000, () => console.log("Running on port 3000"));

////////////////////

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
