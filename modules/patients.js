var mongoose = require('../modules/config');

var conn = mongoose.connection;
var PatientSchema = new mongoose.Schema({
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
    password:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        required: true
    },
    dob:{
        type:String,
        required: true
    },
    gender:{
        type:String,
        required: true
    },
    appointments:[
        {
            doctor_id:{
                type: mongoose.Schema.Types.ObjectId
            },
            time:{
                type: String
            },
            date:{
                type: String
            },
            description:{
                type: String
            },
            approved:{
                type: String
            },
            prescription:[
                {
                    medicine:{
                        medicine_name:{
                            type:Array
                        },
                        how_to_take:{
                            type:Array
                        },
                        when_to_take:{
                            type:Array
                        },
                        how_many:{
                            type:Array
                        }
                    },
                    disease:{
                        type: String
                    }
                }
            ]
        }
    ],
    messages:[
        {
            doctor_id:{
                type: mongoose.Schema.Types.ObjectId
            },
            doctor_name:{
                type: String
            },
            p_messages:[
                {
                    message: {
                        type:String
                    },
                    time:{
                        type:String
                    }
                }
            ],
            d_messages:[
                {
                    message: {
                        type:String
                    },
                    time:{
                        type:String
                    }
                }
            ]
        }
    ]
});

var PatientModel = mongoose.model('Patient' , PatientSchema);

/*PatientModel.findById({_id:"5f70ecbb5b00073fbc151707"},function(err,data){
    if(err) throw err;
    if(data)
    {   data.messages.push({
            doctor_id: '5f70edf35b00073fbc15170c',
            doctor_name:'Stefan',
            p_messages:[],
            d_messages:[]
        });
        var a = data.messages;
        PatientModel.findOneAndUpdate({_id:"5f70ecbb5b00073fbc151707"},
        {
            messages:a
        },
        function(err,data1){
            if(err) throw err;
            if(data1){
                console.log(data1);
            } else {
                console.log('no data');
            }
        });
        var b = data.messages[0].doctor_id;
        data.messages[0].p_messages.push({
            message:'Hi, Doctor',
            time:'8:45 p.m.'
        });
        data.messages[0].d_messages.push({
            message:'Hi, patient',
            time:'8:46 p.m.'
        });
        var c = data.messages[0].p_messages;
        var d = data.messages[0].d_messages;
        console.log(c);
        console.log(d);
        console.log(b);
        PatientModel.findOneAndUpdate({_id:"5f70ecbb5b00073fbc151707","messages.doctor_id":"5f70edf35b00073fbc15170c"},
        {
            'messages.$.p_messages':c,
            'messages.$.d_messages':d
        },
        function(err,data1){
            if(err) throw err;
            if(data1){
                console.log(data1);
            } else {
                console.log('no data');
            }
        });
    }
    
});*/


conn.on("connected",function(){
    console.log("Connected Successfully");
});

conn.on("disconnected",function(){
    console.log("Disconnected Successfully");
});

conn.on('error', console.error.bind(console,'connection error'));

module.exports = PatientModel;