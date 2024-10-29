const mongoose = require('mongoose');
const mongoURI = 'mongodb://0.0.0.0:27017/inotebookDB';

const connectToMongo = () => {
    mongoose.connect(mongoURI).then(() => {
        console.log('connected to mongodb successfully!!!');
    }).catch(err => console.log('error', err));
}

module.exports = connectToMongo;