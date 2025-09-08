const mongoose = require('mongoose')

function connectdb(){
    mongoose.connect(process.env.MONGOOSEDB_URI,{useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log('db connect successfully...');
        
    })
    .catch(()=>{
        console.log('connection failed...', err);
        
    })
}

module.exports = connectdb
