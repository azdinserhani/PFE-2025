import adminService from "../services/adminService.js";

const adminController = {
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await adminService.getUserById(id);
      res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user
      });
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || "An error occurred during retrieving the user";

      res.status(status).json({
        success: false,
        message
      });
    }
  },

  getUserByUsername: async (req, res) => {
    try {
      const { username } = req.params;
      const user = await adminService.getUserByUsername(username);
      res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user
      });
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || "An error occurred during retrieving the user";

      res.status(status).json({
        success: false,
        message
      });
    }
  },

  createUser: async (req, res) => {
    try {
      const userData = req.body;
      const newUser = await adminService.createUser(userData);
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser
      });
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || "An error occurred during creating the user";

      res.status(status).json({
        success: false,
        message
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      await adminService.deleteUser(id);
      res.status(200).json({
        success: true,
        message: "User deleted successfully"
      });
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || "An error occurred during deleting the user";

      res.status(status).json({
        success: false,
        message
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const userData = req.body;
      const updatedUser = await adminService.updateUser(id, userData);
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser
      });
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || "An error occurred during updating the user";

      res.status(status).json({
        success: false,
        message
      });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await adminService.getAllUsers();
      res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        result: users.length,
        data: users
      });
    } catch (error) {
      console.log("Error in getAllUsers:", error);
      
      const status = error.status || 500;
      const message = error.message || "An error occurred during retrieving the users";

      res.status(status).json({
        success: false,
        message
      });
    }
  }
};

export default adminController;
