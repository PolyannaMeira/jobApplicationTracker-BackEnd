import bcrypt from 'bcryptjs';

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

export default hashPassword; verifyPassword;
