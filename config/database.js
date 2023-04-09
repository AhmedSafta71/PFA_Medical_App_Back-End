const mongoose = require('mongoose');
// const dotenv=require('dotenv'); 
// const path = require('path');
// dotenv.config({path: '.env'}); 
const DB_URI=''
const connectDatabase = () => {
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: false
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
})
}
module.exports = connectDatabase; 