import query from '../config/db.js';

const createJobTable = async () => {
    try {
        await query(`
        CREATE TABLE IF NOT EXISTS jobs (
            id INT NOT NULL AUTO_INCREMENT,
            user_id INT NOT NULL,
            companyName VARCHAR(255) NOT NULL,
            jobRole VARCHAR(255),
            salary DECIMAL(10, 2),
            interviewDate DATE,
            location VARCHAR(255),
            status VARCHAR(50),
            notes TEXT,
            created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted TINYINT NOT NULL DEFAULT 0,
            PRIMARY KEY (id),
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
    } catch (error) {
        console.error('Error creating jobs table:', error);
    }
};

const get = async () => {
    const results = await query('SELECT * FROM jobs');
    return results;
};
// Function to get a job by ID
const getById = async (id) => {
    const results = await query('SELECT * FROM jobs WHERE id = ?', [id]);
    return results;
};

const create = async (
    companyName,
    jobRole,
    salary,
    interviewDate,
    location,
    status,
    notes
) => {
    try {
        const createJobProfile = await query(
            `INSERT INTO jobs
            (companyName, jobRole, salary, interviewDate, location, status, notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                companyName,
                jobRole,
                salary,
                interviewDate,
                location,
                status,
                notes
            ]
        );

        return createJobProfile;
    } catch (err) {
        console.error('Error creating job profile:', err);
        throw err;
    }
};

const update = async (
    id,
    companyName,
    jobRole,
    interviewDate,
    salary,
    location,
    status,
    notes
) => {
    const results = await query(
        `UPDATE jobs 
        SET companyName = ?, jobRole = ?, salary = ?, interviewDate = ?, location = ?, status = ?, notes = ?
        WHERE id = ?`,
        [
            companyName,
            jobRole,
            salary,
            interviewDate,

            location,
            status,
            notes,
            id
        ]
    );
    return results;
};

const deleteById = async (id) => {
    const results = await query('DELETE FROM jobs WHERE id = ?', [id]);
    return results;
};
const searchJobs = async (queryString) => {
    const results = await query(
        'SELECT * FROM jobs WHERE companyName LIKE ? OR jobRole LIKE ?',
        [`%${queryString}%`, `%${queryString}%`]
    );
    return results;
};

export { get, getById, create, update, deleteById, searchJobs };
