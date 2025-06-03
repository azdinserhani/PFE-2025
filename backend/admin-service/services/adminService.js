import adminQueries from "../models/adminQueries.js";
const usersService = {
    getUserById: async (user_id) => {
        const user = await adminQueries.getUserById(user_id);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      },
    getUserByUsername: async (username) => {
        const user = await adminQueries.getUserByUsername(username);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      },
    createUser: async (userData) => {
        const userExists = await adminQueries.checkUserExists(userData.username);
        if (userExists) {
          throw new Error("User already exists");
        }
        const newUser = await adminQueries.createUser(userData);
        console.log("User created:", newUser);
        return newUser;
      },
    deleteUser: async (user_id) => {
        const userExists = await adminQueries.getCourseById(user_id); 
        if (!userExists) {
        throw new Error('User not found');
        }
        const deletedUser = await adminQueries.deleteUser(user_id);
        return deletedUser;
    },
    updateUser: async (user_id, userData) => {
        const userExists = await adminQueries.getUserById(user_id);
        if (!userExists) {
          throw new Error("User not found");
        }
        const updatedUser = await adminQueries.updateUser(user_id, userData);
        return updatedUser;
      },
    getAllUsers: async () => {
        const users = await adminQueries.getAllUsers();
        return users;
        },
};

export default usersService;
