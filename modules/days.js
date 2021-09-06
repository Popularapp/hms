var mongoose = require('../modules/config');

var conn = mongoose.connection;
var DaysSchema = new mongoose.Schema({
    day: {
        type: String
    },
    time:{
        type:Array
    }
});

var DaysModel = mongoose.model('Day' , DaysSchema);

conn.on("connected",function(){
    console.log("Connected Successfully");
});

conn.on("disconnected",function(){
    console.log("Disconnected Successfully");
});

conn.on('error', console.error.bind(console,'connection error'));

module.exports = DaysModel;