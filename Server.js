const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const ConnectDB = require('./config/DBConnection');
const { MainCategoryRouter } = require('./routes/CategoryRoute');
const { ProductRouter } = require('./routes/ProductRoute');
require('dotenv/config');


ConnectDB();


app.use(cors());
app.options("*", cors());



// Middleware for parsing URL-encoded form data (optional if you're expecting form submissions)
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));


//Category
app.use("/api/maincategory", MainCategoryRouter);

//Product
app.use('/api/product', ProductRouter);

const startServer = async () => {
    try {
        await ConnectDB();
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on Port http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database. Server not started.');
    }
};

startServer();