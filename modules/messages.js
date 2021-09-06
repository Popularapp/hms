var mongoose = require('../modules/config');

var conn = mongoose.connection;
var ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone_no:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    gender:{
        type:String,
        required: true
    },
    message:{
        type:String,
        required: true
    },
    replied:{
        type:String
    }
});

var ContactModel = mongoose.model('Message' , ContactSchema);
conn.on("connected",function(){
    console.log("Connected Successfully");
});

conn.on("disconnected",function(){
    console.log("Disconnected Successfully");
});

conn.on('error', console.error.bind(console,'connection error'));

module.exports = ContactModel;