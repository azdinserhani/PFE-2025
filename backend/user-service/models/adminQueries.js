import * as db from "../config/db.js";

const adminQueries = {
  createUser: async (userData) => {
    const { username, email, password, profile_pic, role, created_at } =
      userData;
    const query = `
          INSERT INTO user_acount (username, email, password, profile_pic, role, created_at)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING * `;
    const values = [username, email, password, profile_pic, role, created_at];
    const result = await db.query(query, values);
    return result.rows[0];
  },
  getUserByUsername: async (username) => {
    const query = "SELECT * FROM user_acount WHERE username = $1";
    const result = await db.query(query, [username]);
    return result.rows[0];
  },
  getUserById: async (id) => {
    const query =
      "SELECT username,email,role,profile_pic FROM user_acount WHERE id = $1";
    const result = await db.query(query, [id]);
    return result.rows[0];
  },
  checkUserExists: async (username) => {
    const query =
      "SELECT EXISTS( SELECT 1 FROM user_acount WHERE username = $1";
    const values = [username];
    const result = await db.query(query, [username]);
    return result.rows[0].exists;
  },
  getAllUsers: async () => {
    const query = "SELECT username,email,role,profile_pic FROM user_acount";
    const result = await db.query(query);
    return result.rows;
  },
  deleteUser: async (id) => {
    const query = "DELETE FROM user_acount WHERE id = $1";
    await db.query(query, [id]);
  },
  updateUser: async (id, userData) => {
    const { username, email, profile_pic, role } = userData;

    const query = `
          UPDATE user_acount
          SET username = $1, email = $2, role = $3, profile_pic = $4 
          WHERE id = $5
          RETURNING id, username, email, role, profile_pic
        `;
    const values = [username, email, role, profile_pic, id];
    const result = await db.query(query, values);
    return result.rows[0];
  },
  updateUserMe: async (id, userData) => {
    // Extract user data (only include those that are provided)
    const { username, email, profile_pic } = userData;

    // Start building the query
    let query = `UPDATE user_acount SET `;
    const values = [];
    let counter = 1;

    // Dynamically add fields to update if they're provided
    if (username) {
      query += `username = $${counter}, `;
      values.push(username);
      counter++;
    }
    if (email) {
      query += `email = $${counter}, `;
      values.push(email);
      counter++;
    }
    if (profile_pic) {
      query += `profile_pic = $${counter}, `;
      values.push(profile_pic);
      counter++;
    }

    // Remove the trailing comma and space from the query
    query = query.slice(0, -2);

    // Add WHERE clause and RETURNING clause
    query += ` WHERE id = $${counter} RETURNING id, username, email, profile_pic,role`;
    values.push(id);

    // Execute the query
    const result = await db.query(query, values);
    return result.rows[0];
  },
};

export default adminQueries;
