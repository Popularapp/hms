var mongoose = require('../modules/config');
var conn = mongoose.connection;
var NotesSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    },
    title:{
        type:String,
        required: true
    },
    desc:{
        type:String,
        required: true
    }
});

var NotesModel = mongoose.model('Note' , NotesSchema);


conn.on("connected",function(){
    console.log("Connected Successfully");
});

conn.on("disconnected",function(){
    console.log("Disconnected Successfully");
});

conn.on('error', console.error.bind(console,'connection error'));

module.exports = NotesModel;