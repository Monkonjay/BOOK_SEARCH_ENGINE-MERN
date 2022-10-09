const { Book, User } = require("../models");

const resolvers = {
    Query: {
        users: async () => {
            return await User.find();

        }
    },
    Mutation: {
        createUser: async (_root, {username, email, password}) => {
            try {
                return await User.create({
                    username,
                    email,
                    password,
                });

            } catch (err) {
                throw new Error(err);
            }
        }

    }
}

module.exports = resolvers;