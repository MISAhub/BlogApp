require('dotenv').config();
const { Pool } = require('pg');

const poolConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
};

let pool = new Pool(poolConfig);

const getPool = () => pool;

const initDB = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        )
    `;

    try {
        await pool.query(createTableQuery);
    } catch (err) {
        if (err.code === '3D000') {
            const adminConfig = { ...poolConfig, database: 'postgres' };
            const adminPool = new Pool(adminConfig);
            const dbName = process.env.DB_NAME.replace(/"/g, '');
            await adminPool.query(`CREATE DATABASE "${dbName}"`);
            await adminPool.end();

            await pool.end();
            pool = new Pool(poolConfig);
            await pool.query(createTableQuery);
        } else {
            throw err;
        }
    }
};

module.exports = { getPool, initDB };