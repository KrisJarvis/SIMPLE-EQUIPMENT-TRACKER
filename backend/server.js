require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const equipmentRouter = require('./routes/equipment');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/equipment', equipmentRouter);

const { MongoMemoryServer } = require('mongodb-memory-server');

// Database Connection
const connectDB = async () => {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/equipment_tracker';

    try {
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log(`Connected to MongoDB at ${uri}`);
    } catch (err) {
        console.log('Local MongoDB connection failed. Trying in-memory MongoDB...');
        try {
            const mongod = await MongoMemoryServer.create();
            const memoryUri = mongod.getUri();
            await mongoose.connect(memoryUri);
            console.log(`Connected to In-Memory MongoDB at ${memoryUri}`);
        } catch (memoryErr) {
            console.error('Error connecting to In-Memory MongoDB:', memoryErr);
            process.exit(1);
        }
    }
};

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
