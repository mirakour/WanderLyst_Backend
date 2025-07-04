import {Client} from 'pg';
import dotenv from 'dotenv'
dotenv.config()

console.log(process.env.DATABASE_URL)

const db = new Client({connectionString:process.env.DATABASE_URL})

export default db