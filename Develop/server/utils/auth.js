const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // Modified authMiddleware to work with GraphQL context
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.query or headers
    let token = req.query.token || req.headers.authorization;

    // Extract the token from the Bearer header
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // if no token is found, return the request object as is
    if (!token) {
      return req;
    }

    try {
      // verify token and get user data out of it
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      // attach user data to the request object
      req.user = data;
    } catch {
      // If there's a problem with the token, throw an authentication error
      throw new AuthenticationError('Invalid token!');
    }

    // return the modified request object
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
