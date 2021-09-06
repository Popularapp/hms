var mongoose = require('../modules/config');

var conn = mongoose.connection;
var DepartmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    explanation:{
        type:String,
        required: true
    }
});

var DepartmentModel = mongoose.model('Department' , DepartmentSchema);
conn.on("connected",function(){
    console.log("Connected Successfully");
});

conn.on("disconnected",function(){
    console.log("Disconnected Successfully");
});

conn.on('error', console.error.bind(console,'connection error'));

module.exports = DepartmentModel;