import dotenv from "dotenv"
dotenv.config()


export const config = {
  user: String(process.env.PGUSER),
  password: String(process.env.PGPASSWORD),
  host: String(process.env.PGHOST),
  port: process.env.PGPORT,
  database: String(process.env.PGDATABASE),
};
