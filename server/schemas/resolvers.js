const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id }).select(
					"-__v -password"
				);

				return userData;
			}

			throw new AuthenticationError("Not logged in");
		},
		users: async () => {
			return User.find().select("-__v -password");
		},
		user: async (parent, { username }) => {
			return User.findOne({ username }).select("-__v -password");
		},
		retailers: async () => {
			const retailers = await Retailer.find({});
			return retailers;
		},
	},

	Mutation: {
		addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError("Incorrect credentials");
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError("Incorrect credentials");
			}

			const token = signToken(user);
			return { token, user };
		},
		addFriend: async (parent, { friendId }, context) => {
			if (context.user) {
				const updatedUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $addToSet: { friends: friendId } },
					{ new: true }
				).populate("friends");

				return updatedUser;
			}

			throw new AuthenticationError("You need to be logged in!");
		},
		addCandid: async (productName, image, retailerId, userId) => {
			const newCandid = await Candid.create({
				productName,
				image,
				retailerId,
				userId,
			});
			return newCandid;
		},
	},
	checkout: async (parent, args, context) => {
		const url = "https://localhost:3001";
			const order = new Order({ products: args.products });
      // const order = new Order({ });
			const { products } = await order.populate("products");
			const line_items = [];

			for (let i = 0; i < products.length; i++) {
				// generate product id
				const product = await stripe.products.create({
					name: products[i].name,
					description: products[i].description,
					images: [`${url}/images/${products[i].image}`],
          // name: "Subscription",
          // description: "Intro subscription",
				});

				// generate price id using the product id
				const price = await stripe.prices.create({
					// product: product.id,
          product: 1,
					// unit_amount: products[i].price * 100,
          unit_amount: 3 * 100,
					currency: "cad",
				});

				// add price id to the line items array
				line_items.push({
					price: price.id,
					quantity: 1,
				});
			// }
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items,
			mode: "payment",
			success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${url}/`,
		});

		return { session: session.id };
	},
};

module.exports = resolvers;
