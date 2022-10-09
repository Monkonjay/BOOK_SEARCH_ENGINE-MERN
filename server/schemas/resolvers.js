const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        user: async (parent, { username, _id  }, context) => {
            try {
                return await User.findOne({
                    $or: [{ _id }, { username }],
                });
            } catch (error) {
                throw new Error(error);
            };
        },
        loggedInUser: async (parent, args, context) => {
            try {
                if (!context.user) throw new Error('login pls 1');
                const user = User.findById(context.user._id);
                return user;
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    },

    Mutation: {
        createUser: async (parent, args, context) => {
            const user = await User.create({...args });

            if (!user) {
                throw new Error('error wit create mutation');
            };
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { username, email, password }, context) => {
            const user = await User.findOne({ $or: [{ username }, { email }] });
            if (!user) {
                throw new AuthenticationError('error with login mutation');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('wrong login');
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { book }, context) => {
            
            try {
                if (context.user) {
                    return await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { savedBooks: {...book} } },
                        { new: true, runValidators: true }
                    );
                }
                else throw new Error('login pls 2');
            } catch (err) {
                console.log(err);
                throw new Error(err);
            };
        },
        removeBook: async (parent, { bookId }, context) => {
            try {
                if (context.user) {
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { savedBooks: { bookId } } },
                        { new: true }
                    );
                    if (!updatedUser) {
                        return { message: "User not found!  :(" };
                    };
                    return updatedUser;
                }
                else throw new Error('login pls 3');

            } catch (error) {
                throw new Error(error);
            }
        },
    },
};

module.exports = resolvers;






// const { Book, User } = require("../models");

// const resolvers = {
//     Query: {
//         users: async () => {
//             return await User.find();

//         }
//     },
//     Mutation: {
//         createUser: async (_root, {username, email, password}) => {
//             try {
//                 return await User.create({
//                     username,
//                     email,
//                     password,
//                 });

//             } catch (err) {
//                 throw new Error(err);
//             }
//         }

//     }
// }

// module.exports = resolvers;