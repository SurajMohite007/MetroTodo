const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
};

const proConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

// const devConfig = {
//     connectionString: "postgresql://perntodoapp_user:i8Cp2u7MzeRN6qiNeKLmmtFIhzNqJjvv@dpg-cqjrkgogph6c739d56tg-a.oregon-postgres.render.com/perntodoapp",
//     ssl: {
//         rejectUnauthorized: false
//     }
// }
const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig);

module.exports = pool;

