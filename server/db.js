import pkg from "pg";
const { Pool } = pkg;
import { config } from "./config/config.js";
import dotenv from "dotenv";
dotenv.config();



const pool = new Pool({
  user: config.user,
  password: config.password,
  host: config.host,
  port: config.port,
  database: config.database,
});

export default pool;

// const { Client } = pkg;



// export const client = new Client({
//   user: config.user,
//   password: config.password,
//   host: config.host,
//   port: config.port,
//   database: config.database,
// });

// console.log(config.user , config.password , config.host, config.port )
