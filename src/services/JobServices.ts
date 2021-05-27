import db from '../db';

export default class JobServices {


    public static async doExport(bookId: number, type: string): Promise<any[]> {
        return new Promise( (resolve, reject) => {
            db.serialize(() => {
                db.run(`INSERT INTO reedsy_exports(book_id, job_type)
                              VALUES (?, ?)`, [bookId, type]);
                db.all('SELECT * FROM reedsy_exports', (err, rows) => {
                    if(err)
                        reject(err);
                    resolve(rows);
                });
            });
        });
    }
    
    public static async doImport(bookId: number, type: string, url: string): Promise<any[]> {
        return new Promise( (resolve, reject) => {
            db.serialize( () => {
                db.run(`INSERT INTO reedsy_imports(book_id, job_type, url)
                    VALUES (?, ?, ?)`, [bookId, type, url]);
                db.all('SELECT * FROM reedsy_imports', (err, rows) => {
                    if(err)
                        reject(err);
                    resolve(rows);
                });
            });
        });
    }
    
    
    public static getExports(): Promise<any[]> {
        return new Promise( (resolve, reject) => {
            db.serialize( () => {
                db.all('SELECT * FROM reedsy_exports GROUP BY state', (err, rows) => {
                    if(err)
                        reject(err);
                    resolve(rows);
                });
            }); 
        });
    }

    public static getImports(): Promise<any[]> {
        return new Promise( (resolve, reject) => {
            db.serialize( () => {
                db.all('SELECT * FROM reedsy_imports GROUP BY state', (err, rows) => {
                    if(err)
                        reject(err);
                    resolve(rows);
                });
            }); 
        });
    }

}