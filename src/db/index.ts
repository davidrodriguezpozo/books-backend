import { Database } from 'sqlite3';

const sqlite3 = require('sqlite3').verbose();

const db: Database = new sqlite3.Database('reedsy.sqlite', (err: Error|null) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err;
    }else{
        console.log('Connected to the SQLite database.')
    }
});

export default db;
