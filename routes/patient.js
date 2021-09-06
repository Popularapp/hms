var express = require('express');
var router = express.Router();


/*Import databases*/
const AdminModel = require('../modules/admin');
const DepartmentModel = require('../modules/departments');
const PatientModel = require('../modules/patients');
const DoctorModel = require('../modules/doctors');
const DaysModel = require('../modules/days');
const MessageModel = require('../modules/messages');
const NoteModel = require('../modules/notes');

/* GET Dashboard. */
router.get('/dashboard/:id', function(req, res, next) {
  NoteModel.find({user_id:req.params.id},function(err,note){
    MessageModel.find(function(err,message){
      PatientModel.findById(req.params.id,function(err,data){
        if(err) throw err;
        if(data){
          res.render('patient/dashboard',{
            data:data,
            message:message,
            note:note
          });
        }
      });
    });
  });
});

/*Create Notes*/
router.post('/dashboard/:id/create-note',function(req,res,next){
  var id = req.params.id;
  var title = req.body.title;
  var desc = req.body.desc;

  var data = new NoteModel({
    user_id: id,
    title:title,
    desc:desc
  });

  data.save(function(err){
    if(err) throw err;
    if(!err) {
      res.redirect('/patient/dashboard/' + id);
    }
  })
});

/*Edit Notes*/
router.post('/dashboard/:id/edit-note/:id1',function(req,res,next){
  var id = req.params.id;
  var id1 = req.params.id1;
  var title = req.body.title;
  var desc = req.body.desc;

  NoteModel.findByIdAndUpdate(id1,{
    title:title,
    desc:desc
  },function(err,note){
    if(err) throw err;
    if(!err) {
      res.redirect('/patient/dashboard/' + id);
    }
  });
});

/*Delete Notes*/
router.get('/dashboard/:id/delete-note/:id1',function(req,res,next){
  var id = req.params.id;
  var id1 = req.params.id1;

  NoteModel.findByIdAndRemove(id1,function(err,note){
    if(err) throw err;
    if(!err) {
      res.redirect('/patient/dashboard/' + id);
    }
  });
});

/*GET chats*/
router.get('/chats/:id', function(req, res, next) {
  PatientModel.findById(req.params.id,function(err,data){
    if(err) throw err;
    if(data){
      DoctorModel.find(function(err,doctors){
          res.render('patient/chats',{
            data:data,
            doctors:doctors,
          });
      });
    }
  });
});

/*ADD chats */
router.post('/chats/:id/add-chat',function(req,res,next){
  var id = req.params.id;
  var id1 = req.body.doctor;
  PatientModel.findById({_id:id},function(err,data){
    if(err) throw err;
    if(data){
      DoctorModel.findById({_id:id1},function(err,doctor){
        if(err) throw err;
        if(doctor){
          data.messages.push({
            doctor_id: id1,
            doctor_name: doctor.name,
            p_messages:[],
            d_messages:[]
          });
          var a = data.messages;
          PatientModel.findOneAndUpdate({_id:id},
          {
            messages:a
          },
          function(err,data1){
            if(err) throw err;
            if(data1){
              res.redirect('/patient/chats/' + id);
            }
          });
        }
      });
    }
  });
});

/* GET patient logout. */
router.get('/logout', function(req, res, next) {
  res.redirect('/');
});


module.exports = router;
