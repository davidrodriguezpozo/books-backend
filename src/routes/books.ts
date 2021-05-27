import express, { Request, Response } from 'express';
import db from '../db';
import JobServices from '../services/JobServices';
import BookServices from '../services/BookServices';
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
    const bookId: number = parseInt(req.body.bookId);
    const type: string = req.body.type;
    const exportTypes = ['epub', 'pdf'];

    if(!exportTypes.includes(type)) {
        res.status(500).send("Export type not supported");
        return;
    }

    try {
        res.json(await JobServices.doExport(bookId, type));
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
    const bookId: number = parseInt(req.body.bookId);
    const type: string = req.body.type;
    const url: string = req.body.url;
    const importTypes: string[] = ['word', 'pdf', 'wattpad', 'evernote'];

    if (!importTypes.includes(type)){
        res.status(500).send("Import type not supported");
        return;
    }


    try {
        res.json(await JobServices.doImport(bookId, type, url));
    } catch (e: any) {
        res.status(500).send(`Could not perform import action. Error: ${e.message}`);
    }
});


/**
 * GET all export jobs grouped by state
 */
router.get('/exports', async (req: Request, res: Response) => {

    try {
        res.json(await JobServices.getExports());
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
        res.json(await JobServices.getImports());
    } catch (e: any) {
        res.status(500).send(`Could not get import jobs. Error: ${e.message}`);
    }
});


router.get('/', async (req: Request, res: Response) => {
    const skip: number = parseInt(req.query.skip as string);
    try {
        res.json(await BookServices.getBooks(skip));
    } catch (e: any) {
        res.status(500).send(`Could not get import jobs. Error: ${e.message}`);
    }
});


export default router;
