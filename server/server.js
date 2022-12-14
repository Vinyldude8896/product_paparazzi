const stripe = require("stripe")("sk_test_Hrs6SAopgFPF0bZXSN3f6ELN");
const express = require("express");
const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const Product = require("./models/Product");

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



app.use('/candid-photos', express.static(path.resolve(__dirname, './Photos')));
app.get('/',(req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
}) 

// Serve up static assets
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../client/build/index.html"));
	});
}

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
	await server.start();
	app.use(graphqlUploadExpress());
	server.applyMiddleware({ app });

	db.once("open", () => {
		if (!require("fs").existsSync("./Photos")) { require("fs").mkdirSync("Photos")}
		(async () => {
			const product = await Product.findOne({name: "Subscription"})
			if (!product) {
				await Product.create({name: "Subscription", description: "tier1", price: 3, quantity: 1})
			}
		})()
		app.listen(PORT, () => {
			console.log(`API server running on port ${PORT}!`);
			console.log(
				`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
			);
		});
	});
};

////////////////////

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
