/**
 * Created by Adil Imam on 11/18/2017.
 */
//dotenv loads vars inside .env in PROCESS.ENV
require('dotenv').config();
const config={
    portNumber: process.env.PORT_NUMBER,
    walmartSearchAPI:{
        apiEndPoint: process.env.WALMART_SEARCH_API_ENDPOINT,
        apiKey: process.env.WALMART_API_KEY
    },
    mongoDB:{
      host:  process.env.MONGO_HOST,
      port:  process.env.MONGO_PORT
    },
    cronJobDuration: '0 */20 * * * *'  //execute cron job every 20 minutes
}
export default config;
