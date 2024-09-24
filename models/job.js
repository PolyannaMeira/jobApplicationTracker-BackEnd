import query from '../config/db.js';

const createDeviceTable = async () => {
    (await query) 
        `
        CREATE TABLE IF NOT EXISTS devices (
            id INT NOT NULL AUTO_INCREMENT,
            user_id INT NOT NULL,
            companyName VARCHAR(50) NOT NULL,
            created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted TINYINT NOT NULL DEFAULT 0,
            PRIMARY KEY (id),
            KEY user_id (user_id),
            CONSTRAINT devices_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `;
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


const create = async (companyName, jobRole, salary, interviewDate, location, status, notes) => {
    try {
        const createJobProfile = await query(`INSERT INTO jobs
            (companyName, jobRole, salary, interviewDate, location, status, notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`, 
            [companyName, jobRole, salary, interviewDate, location, status, notes]);
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
    status,
    attachment,
    jobUrl,
    location,
    notes
) => {
    const results = await query(
        `UPDATE jobs SET companyName,  jobRole, salary, interviewDate, location, status, attachment, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, 
            companyName, 
            jobRole, 
            interviewDate,
            salary, 
            status,
            attachment,
            jobUrl,
            location,
            notes]
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
