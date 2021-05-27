import db from '../db';

export default class BookServices {
    public static async getBooks(skip: number): Promise<any> {
        return new Promise( (resolve, reject) => {
            db.serialize( () => {
                let totalBooks: number;
                db.get('SELECT COUNT(*) total_books FROM reedsy_books', (err: Error|null, row: any) => {
                    totalBooks = row.total_books;
                });

                db.all('SELECT * FROM reedsy_books ORDER BY updated_at DESC LIMIT 10 OFFSET ?',
                    skip || 0,
                    (err, rows) => {
                        if(err)
                            reject(err);
                        resolve({'rows' : rows, 'total': totalBooks||5});
                    });
            });
        });
    }
}