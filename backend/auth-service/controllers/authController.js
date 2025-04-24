import authService from '../services/authService.js';

// Auth controller methods for handling requests
const authController = {
  /**
   * Register a new user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  register: async (req, res) => {
    try {
      const userData = req.body;
      const result = await authService.register(userData);
      
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result
      });
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || 'An error occurred during registration';
      
      res.status(status).json({
        success: false,
        message
      });
    }
  },
  
  /**
   * Login a user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  login: async (req, res) => {
    try {
      const credentials = req.body;
      const result = await authService.login(credentials);
      
      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result
      });
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || 'An error occurred during login';
      
      res.status(status).json({
        success: false,
        message
      });
    }
  },
  
  /**
   * Get user profile
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await authService.getUserProfile(userId);
      
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || 'An error occurred while fetching profile';
      
      res.status(status).json({
        success: false,
        message
      });
    }
  },
  
  /**
   * Change user password
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  changePassword: async (req, res) => {
    try {
      const userId = req.user.id;
      const { currentPassword, newPassword } = req.body;
      
      const result = await authService.changePassword(userId, currentPassword, newPassword);
      
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || 'An error occurred while changing password';
      
      res.status(status).json({
        success: false,
        message
      });
    }
  },
  
  /**
   * Check JWT token validity and return user data
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  validateToken: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await authService.getUserProfile(userId);
      
      res.status(200).json({
        success: true,
        data: {
          user
        }
      });
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || 'Invalid token';
      
      res.status(status).json({
        success: false,
        message
      });
    }
  }
};

export default authController; 