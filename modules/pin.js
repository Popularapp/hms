var mongoose = require('../modules/config');

var conn = mongoose.connection;
var PinSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        unique: true
    },
    pin:{
        type:String,
        required: true
    }
});

var PinModel = mongoose.model('Pin' , PinSchema);

conn.on("connected",function(){
    console.log("Connected Successfully");
});

conn.on("disconnected",function(){
    console.log("Disconnected Successfully");
});

conn.on('error', console.error.bind(console,'connection error'));

module.exports = PinModel;