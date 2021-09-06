var mongoose = require('../modules/config');

var conn = mongoose.connection;
var BlogSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    uploads:{
        type:String
    },
    title:{
        type:String,
        required: true
    },
    explanation:{
        type:String,
        required: true
    }
});

var BlogModel = mongoose.model('Blog' , BlogSchema);
conn.on("connected",function(){
    console.log("Connected Successfully");
});

conn.on("disconnected",function(){
    console.log("Disconnected Successfully");
});

conn.on('error', console.error.bind(console,'connection error'));

module.exports = BlogModel;