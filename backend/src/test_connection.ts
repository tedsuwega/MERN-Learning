import mongoose from 'mongoose';

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING as string;

// Function to establish MongoDB connection with retry logic
const connectWithRetry = () => {
    mongoose.connect(MONGODB_CONNECTION_STRING as string, {
        connectTimeoutMS: 30000, // 30 seconds timeout
    })
    .then(() => {
        console.log("Connected to MongoDB:", MONGODB_CONNECTION_STRING);
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        console.log("Retrying connection in 5 seconds...");
        setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
    });
};

// Initial connection attempt
connectWithRetry();
