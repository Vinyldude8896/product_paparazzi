const { AuthenticationError } = require("apollo-server-express");
const { User, Photo, Category, Order } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // User: async (parent, args) => {
    //     const usersData = await User.find({})
    //     .select('-__v -password')
    //     .populate('photos');

    //     return usersData;
    // },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("thoughts")
          .populate("friends");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addPhoto: async (parent, args, context) => {
        if (context.user) {
          const photo = await Photo.create({ ...args, username: context.user.username });
      
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { photos: photo._id } },
            { new: true }
          );
      
          return photo;
        }
      
        throw new AuthenticationError('You need to be logged in!');
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
  },
};

module.exports = resolvers;
