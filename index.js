import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotev from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

/**
 * Config
 */
dotev.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(cors);

console.log('heyy');

/**
 * Mongoose Setup
 */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
