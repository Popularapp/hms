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
      DoctorModel.findById(req.params.id,function(err,data){
        if(err) throw err;
        if(data){
          res.render('doctor/dashboard',{
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
      res.redirect('/doctor/dashboard/' + id);
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
      res.redirect('/doctor/dashboard/' + id);
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
      res.redirect('/doctor/dashboard/' + id);
    }
  });
});

/* GET doctor logout. */
router.get('/logout', function(req, res, next) {
  res.redirect('/');
});


module.exports = router;
