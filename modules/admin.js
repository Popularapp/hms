var mongoose = require('../modules/config');

var conn = mongoose.connection;
var AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
});

var AdminModel = mongoose.model('Admin' , AdminSchema);

conn.on("connected",function(){
    console.log("Connected Successfully");
});

conn.on("disconnected",function(){
    console.log("Disconnected Successfully");
});

conn.on('error', console.error.bind(console,'connection error'));

module.exports = AdminModel;