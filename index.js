import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotev from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import kpisRoutes from './routes/kpi.js';
import productRoutes from './routes/product.js';
import Product from './models/Product.js';
import KPI from './models/KPI.js';
import { kpis, products } from './data/data.js';

/**
 * Config
 */
dotev.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));

/**
 * Routes
 */
app.use('/kpi', kpisRoutes);
app.use('/product', productRoutes);

/**
 * Mongoose Setup
 */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server Port: ${PORT}`);
    });
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
  })
  .catch((error) => console.log(`${error} did not connect`));
