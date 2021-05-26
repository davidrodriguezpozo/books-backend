import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import nodeSchedule from 'node-schedule';
import cors from 'cors';

/**
 * ROUTES
 */
import mountRouter from './routes';
import { updateState } from './db/cronTasks';

const app = express();

/**
 * Add middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

/**
 * ROUTES
 */
mountRouter(app);





/**
 * Update state manually since SQLite does not support cron tasks
 */
nodeSchedule.scheduleJob('*/10 * * * * *', async () => {
    try {
        await updateState();
    } catch (e) {
        console.warn('Error updating the state of the books');
    }
});


app.listen(5000);
console.log('Listening on port 5000');