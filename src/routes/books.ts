import express, { Request, Response } from 'express';
import db from '../db';
const router = express.Router();


/**
 * POST a new Export job
 * Request body contains
 * {
 *     bookId: string
 *     type: "epub" | "pdf"
 * }
 *
 */
router.post('/export', async (req: Request, res: Response) => {
      const bookId: string = req.body.bookId;
      const type: string = req.body.type;
      const exportTypes = ['epub', 'pdf'];

      if(!exportTypes.includes(type)) {
        res.status(500).send("Export type not supported");
        return;
      }
      try {
        db.run(`INSERT INTO reedsy_exports(book_id, job_type) VALUES(?, ?)`, [bookId, type]);
        db.all('SELECT * FROM reedsy_exports', (err, rows) => {
          res.json(rows);
        });
      } catch (e: any) {
        res.status(500).send(`Could not perform export action. Error: ${e.message}`);
      }
});


/**
 * POST a new Import job
 * Request body contains
 * {
 *    bookId: string,
 *    type: "word" | "pdf" | "wattpad" | "evernote",
 *    url: string
 * }
 *
 */
router.post('/import', async (req: Request, res: Response) => {
  const bookId: string = req.body.bookId;
  const type: string = req.body.type;
  const url: string = req.body.url;
  const importTypes: string[] = ['word', 'pdf', 'wattpad', 'evernote'];

  if (!importTypes.includes(type)){
    res.status(500).send("Import type not supported");
    return;
  }


  try {
    db.run(`INSERT INTO reedsy_imports(book_id, job_type, url) VALUES(?, ?, ?)`, [bookId, type, url]);
    db.all('SELECT * FROM reedsy_imports', (err, rows) => {
      res.json(rows);
    });
  } catch (e: any) {
    res.status(500).send(`Could not perform import action. Error: ${e.message}`);
  }
});


/**
 * GET all export jobs grouped by state
 */
router.get('/exports', async (req: Request, res: Response) => {

  try {
    db.all('SELECT * FROM reedsy_exports GROUP BY state', (err, rows) => {
      res.json(rows);
    });
  } catch (e: any) {
    res.status(500).send(`Could not get export jobs. Error: ${e.message}`);
  }
});

/**
 * POST a new Import job
 * Request body contains
 * {
 *    bookId: string,
 *    type: "word" | "pdf" | "wattpad" | "evernote",
 *    url: string
 * }
 *
 */
router.get('/imports', async (req: Request, res: Response) => {

  try {
    db.all('SELECT * FROM reedsy_imports GROUP BY state', (err, rows) => {
      res.json(rows);
    });
  } catch (e: any) {
    res.status(500).send(`Could not get import jobs. Error: ${e.message}`);
  }
});


router.get('/', async (req: Request, res: Response) => {
  const skip = req.query.skip;
  try {
    let totalBooks: number;
    db.get('SELECT COUNT(*) total_books FROM reedsy_books', (err: Error|null, row: any) => {
      totalBooks = row.total_books;
    });

    db.all('SELECT * FROM reedsy_books ORDER BY updated_at DESC LIMIT 10 OFFSET ?', skip || 0,  (err, rows) => {
      res.json({'rows' : rows, 'total': totalBooks||5});
    });

  } catch (e: any) {
    res.status(500).send(`Could not get import jobs. Error: ${e.message}`);
  }
});


export default router;
