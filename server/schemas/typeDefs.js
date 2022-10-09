const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		password: String
		
	}

	type Book {
		_id: ID
        bookID: String,
        authors: String,
		title: String,
		description: String,
        image: String,
        link: String,
        title: String,
		
	}

	type Query {
		users: [User]!
        user(id: String!): User
		book(bookId: String!): Book
	}

	type Mutation {
        createUser(username: String!, email: String!, password: String!): User
        login(email: String!, password: String!)

		
	}
`;

module.exports = typeDefs;

// const router = require('express').Router();
// const {
//   createUser,
//   getSingleUser,
//   saveBook,
//   deleteBook,
//   login,
// } = require('../../controllers/user-controller');

// // import middleware
// const { authMiddleware } = require('../../utils/auth');

// // put authMiddleware anywhere we need to send a token for verification of user
// router.route('/').post(createUser).put(authMiddleware, saveBook);

// router.route('/login').post(login);

// router.route('/me').get(authMiddleware, getSingleUser);

// router.route('/books/:bookId').delete(authMiddleware, deleteBook);

// module.exports = router;