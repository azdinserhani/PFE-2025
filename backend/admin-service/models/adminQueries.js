import * as db from '../../admin-service/config/db.js';

const adminQueries = {
    createUser: async (userData) => {
        const { username, email, password, profile_pic, role, created_at } = userData;
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
    const query = "SELECT * FROM user_acount WHERE id = $1";
    const result = await db.query(query, [id]);
    return result.rows[0];
},
  checkUserExists: async (username) => {
    const query = "SELECT EXISTS( SELECT 1 FROM user_acount WHERE username = $1";
    const values = [username];
    const result = await db.query(query, [username]);
    return result.rows[0].exists;
  }, 
getAllUsers: async () => {
    const query = "SELECT * FROM user_acount";
    const result = await db.query(query);
    return result.rows;
},
    deleteUser: async (id) => {
        const query = "DELETE FROM user_acount WHERE id = $1";
        await db.query(query, [id]);
    },
    updateUser: async (id, userData) => {
        const { username, email, profile_pic, role, created_at } = userData;
        
        const query = `
          UPDATE user_acount
          SET username = $1, email = $3, role = $4, profile_pic = $5 , created_at = $6
          WHERE id = $2
          RETURNING id, username, email, role, profile_pic, created_at
        `;
        const values = [username, email, role, profile_pic, created_at, id];
        const result = await db.query(query, values);
        return result.rows[0];
      },
   

};

export default adminQueries;