import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userQueries from "../models/userQueries.js";

// Auth service methods
const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User data for registration
   * @returns {Object} Created user data and token
   */
  register: async (userData) => {
    // Check if email already exists
    const existingUserEmail = await userQueries.findUserByEmail(userData.email);
    if (existingUserEmail) {
      throw { status: 409, message: "Email already in use" };
    }

    // Check if username already exists
    const existingUsername = await userQueries.findUserByUsername(
      userData.username
    );
    if (existingUsername) {
      throw { status: 409, message: "Username already taken" };
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(userData.password, salt);

    // Create user object
    const newUserData = {
      username: userData.username,
      email: userData.email,
      password_hash,
    };

    // Create user in database
    const user = await userQueries.createUser(newUserData);

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "24h" }
    );

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        profile_pic: user.profile_pic,
        created_at: user.created_at,
      },
      token,
    };
  },

  /**
   * Login a user
   * @param {Object} credentials - Login credentials
   * @returns {Object} User data and token
   */
  login: async (credentials) => {
    // Check if user exists
    const user = await userQueries.findUserByEmail(credentials.email);
    if (!user) {
      throw { status: 401, message: "Invalid email or password" };
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(
      credentials.password,
      user.password_hash
    );
    if (!validPassword) {
      throw { status: 401, message: "Invalid email or password" };
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "100d" }
    );

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        profile_pic: user.profile_pic,
        created_at: user.created_at,
      },
      token,
    };
  },

  /**
   * Get user profile by ID
   * @param {number} id - User ID
   * @returns {Object} User profile data
   */
  getUserProfile: async (id) => {
    const user = await userQueries.findUserById(id);
    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    return user;
  },

  /**
   * Change user password
   * @param {number} userId - User ID
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Object} Success message
   */
  changePassword: async (userId, currentPassword, newPassword) => {
    // Get user with password hash
    const user = await userQueries.findUserById(userId);
    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    // Check current password
    const validPassword = await bcrypt.compare(
      currentPassword,
      user.password_hash
    );
    if (!validPassword) {
      throw { status: 401, message: "Current password is incorrect" };
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(newPassword, salt);

    // Update password in database
    await userQueries.updatePassword(userId, password_hash);

    return { message: "Password changed successfully" };
  },
};

export default authService;
