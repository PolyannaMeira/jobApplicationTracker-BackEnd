import query from '../config/db.js';

/**
 * Creates the "jobs" table if it doesn't already exist.
 * This should be run once when initializing the app.
 */
const createJobTable = async () => {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        companyName VARCHAR(255) NOT NULL,
        jobRole VARCHAR(255),
        salary NUMERIC(10, 2),
        interviewDate DATE,
        location VARCHAR(255),
        status VARCHAR(50),
        notes TEXT,
        attachment VARCHAR(255),
        jobUrl TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted BOOLEAN DEFAULT FALSE
      );
    `);
  } catch (error) {
    console.error('Error creating jobs table:', error);
  }
};

/**
 * Fetches all jobs from the database.
 * @returns {Promise<Array>} List of all jobs
 */
const get = async () => {
  const result = await query('SELECT * FROM jobs');
  return result;
};

/**
 * Fetches a single job by its ID.
 * @param {number} id - Job ID
 * @returns {Promise<Object|null>} Job object or null if not found
 */
const getById = async (id) => {
  const result = await query('SELECT * FROM jobs WHERE id = $1', [id]);
  return result[0]; // Only return the first match
};

/**
 * Inserts a new job into the database.
 * @param {string} companyName
 * @param {string} jobRole
 * @param {number} salary
 * @param {string} interviewDate - In ISO format (YYYY-MM-DD)
 * @param {string} location
 * @param {string} status
 * @param {string} notes
 * @param {string|null} attachment - Optional file name
 * @returns {Promise<Object>} Newly created job
 */
const create = async (
  companyName,
  jobRole,
  salary,
  interviewDate,
  location,
  status,
  notes,
  attachment
) => {
  try {
    const result = await query(
      `INSERT INTO jobs
        (companyName, jobRole, salary, interviewDate, location, status, notes, attachment)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        companyName,
        jobRole,
        salary,
        interviewDate,
        location,
        status,
        notes,
        attachment
      ]
    );

    return result[0];
  } catch (err) {
    console.error('Error creating job profile:', err);
    throw err;
  }
};

/**
 * Updates a job by its ID.
 * @param {number} id
 * @param {string} companyName
 * @param {string} jobRole
 * @param {number} salary
 * @param {string} interviewDate
 * @param {string} location
 * @param {string} status
 * @param {string|null} jobUrl
 * @param {string} notes
 * @returns {Promise<Object|null>} Updated job or null if not found
 */
const update = async (
  id,
  companyName,
  jobRole,
  salary,
  interviewDate,
  location,
  status,
  jobUrl,
  notes
) => {
  const result = await query(
    `UPDATE jobs 
     SET companyName = $1,
         jobRole = $2,
         salary = $3,
         interviewDate = $4,
         location = $5,
         status = $6,
         jobUrl = $7,
         notes = $8,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $9
     RETURNING *`,
    [
      companyName,
      jobRole,
      salary,
      interviewDate,
      location,
      status,
      jobUrl,
      notes,
      id
    ]
  );

  return result[0];
};

/**
 * Deletes a job by its ID.
 * @param {number} id
 * @returns {Promise<any>} Query result
 */
const deleteById = async (id) => {
  const result = await query('DELETE FROM jobs WHERE id = $1', [id]);
  return result;
};

/**
 * Searches jobs based on a string matching companyName or jobRole.
 * Case-insensitive.
 * @param {string} queryString - Search term
 * @returns {Promise<Array>} List of matching jobs
 */
const searchJobs = async (queryString) => {
  const result = await query(
    `SELECT * FROM jobs 
     WHERE LOWER(companyName) LIKE LOWER($1)
        OR LOWER(jobRole) LIKE LOWER($2)`,
    [`%${queryString}%`, `%${queryString}%`]
  );
  return result;
};

export {
  get,
  getById,
  create,
  update,
  deleteById,
  searchJobs,
  createJobTable
};
