import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createConnection } from 'mysql2/promise';
// import { marvelRouter } from './routes/marvelRouter';
import { authRouter } from './routes/authRouter';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRouter);
// app.use('/marvel', marvelRouter);

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    // try {
    //     const connection = await createConnection({
    //         host: process.env.MYSQL_HOST,
    //         user: process.env.MYSQL_USER,
    //         password: process.env.MYSQL_PASSWORD,
    //         database: process.env.MYSQL_DATABASE,
    //     });
    //     console.log('Connected to MySQL database');
    // } catch (error) {
    //     console.error('Error connecting to MySQL database:', error);
    // }
});
