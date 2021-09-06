var mongoose = require('../modules/config');

var conn = mongoose.connection;
var DoctorSchema = new mongoose.Schema({
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
    deg:{
        type:String
    },
    college:{
        type:String
    },
    department:{
        type:String
    },
    experience:{
        type:String
    },
    degree_pdf:{
        type:String
    },
    intern_pdf:{
        type:String
    },
    photo:{
        type:String
    },
    appointments:[
        {
            pateint_id:{
                type: mongoose.Schema.Types.ObjectId
            },
            time:{
                type: String
            },
            date:{
                type: String
            }
        }
    ],
    approved:{
        type:String
    },
    messages:[
        {
            patient_id:{
                type: mongoose.Schema.Types.ObjectId
            },
            patient_name:{
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

var DoctorModel = mongoose.model('Doctor' , DoctorSchema);

/*DoctorModel.findById({_id:"5f6cd85ed696ca2918f45cb5"},function(err,data){
    if(err) throw err;
    if(data)
    {
        data.messages.push({
            patient_id:'5f6cd76dd696ca2918f45cb3',
            p_messages:[],
            d_messages:[]
        });
        var a = data.messages;
        DoctorModel.findOneAndUpdate({_id:"5f6cd85ed696ca2918f45cb5"},
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
        var b = data.messages[0].patient_id;
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
        DoctorModel.findOneAndUpdate({_id:"5f6cd85ed696ca2918f45cb5","messages.patient_id":"5f6cd76dd696ca2918f45cb3"},
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

module.exports = DoctorModel;