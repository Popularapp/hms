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
  NoteModel.find({user_id : req.params.id},function(err,note){
    MessageModel.find(function(err,message){
      AdminModel.findById(req.params.id,function(err,data){
        if(err) throw err;
        if(data){
          res.render('admin/dashboard',{
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
      res.redirect('/admin/dashboard/' + id);
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
      res.redirect('/admin/dashboard/' + id);
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
      res.redirect('/admin/dashboard/' + id);
    }
  });
});

/* GET Doctor. */
router.get('/doctors/:id', function(req, res, next) {
  AdminModel.findById(req.params.id,function(err,data){
    if(err) throw err;
    if(data){
      res.render('admin/doctors',{
        data:data
      }); 
    }
  });
});

/* GET Departments. */
router.get('/departments/:id', function(req, res, next) {
  AdminModel.findById(req.params.id,function(err,data){
    if(err) throw err;
    if(data){
      DepartmentModel.find(function(err,department){
        res.render('admin/departments',{
          department:department,
          data:data
        });
      }); 
    }
  });
});

/* POST New Departments. */
router.post('/departments/:id/new-department', function(req, res, next) {
  var title = req.body.title;
  var description = req.body.description;
  var id = req.params.id;
  console.log(title);
  console.log(description);
  var data = new DepartmentModel({
    title:title,
    explanation:description
  });
  data.save(function(err){
    if(err) throw err;
    if(!err){
      req.flash('success','Department added successfully');
      res.redirect('/admin/departments/' + id);
    }
  });
});

/* POST Edit Departments. */
router.post('/departments/:id/edit-department/:id1', function(req, res, next) {
  var title = req.body.title;
  var description = req.body.description;
  var id = req.params.id;
  var id1 = req.params.id1;
  DepartmentModel.findByIdAndUpdate(id1,{
    title:title,
    explanation:description
  },function(err,data){
    if(err) throw err;
    if(!err){
      req.flash('success','Department edited successfully');
      res.redirect('/admin/departments/' + id);
    }
  });
});

/* DELETE departments */
router.get('/departments/deleteDepartment/:id/:id1', function(req, res, next) {
  var id = req.params.id;
  var id1 = req.params.id1;
  console.log(id);
  DepartmentModel.findByIdAndRemove(id,function(err,data){
    if(err) throw err;
    if(!err){
      req.flash('success','Department deleted successfully');
      res.redirect('/admin/departments/' + id1);
    }
  })
});

/* GET patients. */
router.get('/patients/:id', function(req, res, next) {
  PatientModel.find(function(err,patient){
    AdminModel.findById(req.params.id,function(err,data){
      if(err) throw err;
      if(data){
        res.render('admin/patients',{
          data:data,
          patient:patient
        });
      }
    });
  });
});

/* POST New Patients. */
router.post('/patients/:id/add-patient', function(req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var phone_no = req.body.phone_no;
    var password = req.body.password;
    var age = req.body.age;
    var dob = req.body.dob;
    var gender = req.body.gender;
    var id = req.params.id;
      PatientModel.find({$or:[{email:email},{phone_no:phone_no}]},function(err,data){
        if(err) throw err;
        if(data[0] != null){
          if(data[0].email == req.body.email && data[0].phone_no != req.body.phone_no){
            req.flash('danger','Email already Exists');
            res.redirect('/admin/patients/' + id);
          } else if(data[0].email != req.body.email && data[0].phone_no == req.body.phone_no){
            req.flash('danger','Phone Number already Exists');
            res.redirect('/admin/patients/' + id);
          } else if(data[0].email == req.body.email && data[0].phone_no == req.body.phone_no){
            req.flash('danger','Email and Phone Number already Exists');
            res.redirect('/admin/patients/' + id);
          }
        } else {
          if(password == req.body.cpassword){
            var patient_data = new PatientModel({
              name:name,
              email:email,
              phone_no:phone_no,
              password: password,
              age: age,
              dob:dob,
              gender: gender
            });
            patient_data.save(function(err){
              if(err) throw err;
              if(!err){
                req.flash('success','Patient added Successfully');
                res.redirect('/admin/patients/' + id);
              }
            });
          } else {
            req.flash('danger','Password do not match');
            res.redirect('/admin/patients/' + id);
          }
        }
      });
    
});

/* POST Edit Patients. */
router.post('/patients/:id/edit-patient/:id1', function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var phone_no = req.body.phone_no;
  var age = req.body.age;
  var dob = req.body.dob;
  var gender = req.body.gender;
  var id = req.params.id;
  var id1 = req.params.id1;
  PatientModel.findByIdAndUpdate(id1,{
    name:name,
    email:email,
    phone_no:phone_no,
    age:age,
    dob:dob,
    gender:gender
  },function(err,data){
    if(err) throw err;
    if(!err){
      req.flash('success','Patient edited successfully');
      res.redirect('/admin/patients/' + id);
    }
  });
});

/* DELETE patients */
router.get('/patients/deletepatient/:id/:id1', function(req, res, next) {
  var id = req.params.id;
  var id1 = req.params.id1;
  PatientModel.findByIdAndRemove(id,function(err,data){
    if(err) throw err;
    if(!err){
      req.flash('success','Patient deleted successfully');
      res.redirect('/admin/patients/' + id1);
    }
  })
});


/* GET Blogs. */
router.get('/blogs/:id', function(req, res, next) {
  AdminModel.findById(req.params.id,function(err,data){
    if(err) throw err;
    if(data){
      res.render('admin/blogs',{
        data:data
      }); 
    }
  });
});

/* GET Messages. */
router.get('/messages/:id', function(req, res, next) {
  MessageModel.find(function(err,message){
    AdminModel.findById(req.params.id,function(err,data){
      if(err) throw err;
      if(data){
        res.render('admin/messages',{
          data:data,
          message:message
        }); 
      }
    });
  });
});

/* GET Inventory. */
router.get('/inventory/:id', function(req, res, next) {
  AdminModel.findById(req.params.id,function(err,data){
    if(err) throw err;
    if(data){
      res.render('admin/inventory',{
        data:data
      }); 
    }
  });
});

/* GET admin logout. */
router.get('/logout', function(req, res, next) {
  res.redirect('/');
});

/* Searching through Ajax */
router.get('/admin/searchPhone/:phone',function(req,res,next){
  var phone = req.params.phone;
  PatientModel.find({phone_no:phone},function(err,data){
    if(!err){
      res.jsonp(data);
      console.log(data);
    }
  });
});

router.get('/admin/searchEmail/:email',function(req,res,next){
  var email = req.params.email;
  console.log(email);
  DoctorModel.find({email:email},function(err,data){
    if(!err){
      res.jsonp(data);
      console.log(data);
    }
  });
});
module.exports = router;
