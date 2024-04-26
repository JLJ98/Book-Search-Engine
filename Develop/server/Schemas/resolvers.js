const User = require('../models/User');

const resolvers = {
  Query: {
    getUser: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not logged in');
      return User.findById(user._id);
    }
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const newUser = new User({ username, email, password });
      await newUser.save();
      return newUser;
    }
  }
};

module.exports = { resolvers };
