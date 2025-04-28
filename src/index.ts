import express from 'express';
import { PrismaClient } from '@prisma/client';
import AdminRouter from './routers/admin.router';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use('/api/admin', AdminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
