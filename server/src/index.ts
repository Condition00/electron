import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const mongoDBURL = process.env.MONGODB_URI || '';
const PORT = process.env.PORT || 3000;

mongoose.connect(mongoDBURL)
  .then(() => {
    console.log("MongoDB database connection established successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch(err => console.error("MongoDB connection error:", err));

app.get('/', (_req, res) => {
  res.send('Hello!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

