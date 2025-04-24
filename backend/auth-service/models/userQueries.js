import * as db from '../config/db.js';

// User queries for database operations
const userQueries = {
  // Create a new user
  createUser: async (userData) => {
    const { username, email, password_hash, role, profile_pic } = userData;
    
    const query = `
      INSERT INTO user_acount (username, email, password_hash, role, profile_pic)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, username, email, role, profile_pic, created_at
    `;
    
    const values = [username, email, password_hash, role, profile_pic];
    const result = await db.query(query, values);
    return result.rows[0];
  },
  
  // Find user by email
  findUserByEmail: async (email) => {
    const query = 'SELECT * FROM user_acount WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  },
  
  // Find user by username
  findUserByUsername: async (username) => {
    const query = 'SELECT * FROM user_acount WHERE username = $1';
    const result = await db.query(query, [username]);
    return result.rows[0];
  },
  
  // Find user by ID
  findUserById: async (id) => {
    const query = 'SELECT id, username, email, role, profile_pic, created_at FROM user_acount WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  },
  
  // Update user profile
  updateUser: async (id, userData) => {
    const { username, email, profile_pic } = userData;
    
    const query = `
      UPDATE user_acount
      SET username = $1, email = $2, profile_pic = $3
      WHERE id = $4
      RETURNING id, username, email, role, profile_pic, created_at
    `;
    
    const values = [username, email, profile_pic, id];
    const result = await db.query(query, values);
    return result.rows[0];
  },
  
  // Update user password
  updatePassword: async (id, password_hash) => {
    const query = `
      UPDATE user_acount
      SET password_hash = $1
      WHERE id = $2
      RETURNING id
    `;
    
    const result = await db.query(query, [password_hash, id]);
    return result.rows[0];
  }
};

export default userQueries; 