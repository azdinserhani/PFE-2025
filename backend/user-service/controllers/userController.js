import usersService from "../services/adminService.js";

const userController = {
  getUserMe: async (req, res) => {
    const userInfo = await usersService.getUserById(req.user.id);
    res.status(200).json({
      success: true,
      message: "User details retrieved successfully",
      data: userInfo,
    });
  },
  updateProfile: async (req, res) => {
    const { username, email, profile_pic } = req.body;
    const updatedUser = await usersService.updateUserMe(req.user.id, {
      username,
      email,
      profile_pic,
    });
    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: updatedUser,
    });
  },
};

export default userController;
