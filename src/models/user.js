// const pool = require('.db.js').pool;
const { getPool } = require('../../db');
const createUser = async ({username, password}) => {
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
    const values = [username, password];
    try {
        const res = await getPool().query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
};

const getUserByUsername = async (username) => {
    const query = 'SELECT * FROM users WHERE username = $1';
    try {
        const res = await getPool().query(query, [username]);
        return res.rows[0];
    } catch (err) {
        console.error('Error fetching user by username:', err);
        throw err;
    }
};

module.exports = {
    createUser,
    getUserByUsername
};