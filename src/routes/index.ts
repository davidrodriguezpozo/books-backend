import express, { Express } from 'express';
const router = express.Router();

import booksRouter from './books';

function mountRouter(app: Express): void {
  app.use('/books', booksRouter);
  app.use('/', router)
}


export default mountRouter;
