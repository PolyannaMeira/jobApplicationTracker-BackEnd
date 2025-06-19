import query from '../config/db.js';

/**
 * Creates the users table if it does not exist.
 */
const createUserTable = async () => {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (err) {
    console.error('Error creating users table:', err);
    throw err;
  }
};

/**
 * Finds a user by email.
 * @param {string} email - The user's email.
 * @returns {Promise<Object|undefined>} The user object if found, otherwise undefined.
 */
const findUserByEmail = async (email) => {
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  return result[0];
};

/**
 * Inserts a new user into the database.
 * @param {string} email - The user's email.
 * @param {string} hashedPassword - The user's hashed password.
 * @returns {Promise<void>}
 */
const insertUser = async (email, hashedPassword) => {
  await query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);
};

export {
  createUserTable,
  findUserByEmail,
  insertUser
};

