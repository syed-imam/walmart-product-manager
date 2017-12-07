/**
 * Created by Adil Imam on 11/18/2017.
 */
import mongoose from 'mongoose';
import Promise from 'bluebird';
import config from '../config/config';
import express from 'express';
import path from 'path';
import routes from './routes/index.route.js';
import cron from 'node-cron';
import productCtrl from './controllers/product.controller'

//Create the express app
const app=express();

//Mount all routes on "/" path
app.use('/', routes);

//Middleware

app.use(express.static(path.join(__dirname,'../client')));

//Set up MongoDB Connection
mongoose.Promise=Promise;
const mongoUrl = config.mongoDB.host;
mongoose.connect(mongoUrl, {
    useMongoClient:true,
});

mongoose.connection.on('error', () => {
    throw new Error(`Unable to connect to database: ${mongoUrl}`);
});

//cron.schedule(config.cronJobDuration, productCtrl.queryWalmartApi, ); //cron job runs every 20 minutes
export default app;
