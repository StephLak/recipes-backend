import mongoose from 'mongoose';
import { app } from './app';
import dotenv from 'dotenv';

dotenv.config();

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY deve essere definito');
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI deve essere definito');
    }
    
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connesso a MongoDb');
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('Ascolto sulla porta 3000!!');
    });
}

start();