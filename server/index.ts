import express from 'express';
import cors from 'cors';
import dataRoutes from './src/routes/data';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
  }));

app.use(express.json());

app.use("/", dataRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Server running'))