import {Pool} from 'pg'

console.log(`Host_DB ${process.env.HOST}`);
console.log(`User_DB ${process.env.USER_DB}`);
console.log(`Pass_DB ${process.env.PASSWORD_DB}`);
console.log(`Port_DB ${process.env.PORT_DB}`);

export const pool =  new Pool({
    host: process.env.HOST || 'localhost',
    user: process.env.USER_DB || 'root',
    password: process.env.PASSWORD_DB || 'root',
    database: process.env.DATABASE || 'root',
    port: Number(process.env.PORT_DB) || 5432
});