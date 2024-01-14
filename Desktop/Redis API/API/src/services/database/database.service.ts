import mysql from 'mysql2/promise';
import 'dotenv/config';

const conn = mysql.createConnection({
         // host : process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            port: +(process.env.DB_PORT || 3306), 
        });

        export default conn;








