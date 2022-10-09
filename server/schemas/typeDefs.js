const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		savedBooks: [Book]
		
	}

	type Book {
        bookID: String,
        authors: String,
		title: String,
		description: String,
        image: String,
        link: String,     	
	}

    type Auth {
        token:ID
        user: User
    }

    input BookInput {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

	type Query {
		user(username: String, _id: ID): User
        loggedInUser: User
	}

	type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!, username: String): Auth
        saveBook(book: BookInput): User
        removeBook(bookId: ID!): User	
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