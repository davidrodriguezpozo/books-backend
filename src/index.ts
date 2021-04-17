import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';



/**
 * ROUTES
 */
import customerRouter from './routes/customers';
import indexRouter from './routes/routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/customer', customerRouter);
app.listen(5000);
console.log('Listening on port 5000');






