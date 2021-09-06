var express = require('express');
var router = express.Router();
var mkdirp = require('mkdirp');
var fs = require('fs-extra');
var resizeImg = require('resize-img');

/*Import databases*/
const AdminModel = require('../modules/admin');
const DepartmentModel = require('../modules/departments');
const PatientModel = require('../modules/patients');
const DoctorModel = require('../modules/doctors');
const DaysModel = require('../modules/days');
const PinModel = require('../modules/pin');
const MessageModel = require('../modules/messages');

/* GET home page. */
router.get('/', function(req, res, next) {
  DaysModel.find(function(err,days){
    DoctorModel.find(function(err,doctors){
      DepartmentModel.find(function(err,department){
        if(err) throw err;
        if(department){
          res.render('index',{
            doctors:doctors,
            department: department,
            loggedin: 0,
            admin:0,
            days:days,
            data: null,
            login_as:null,
            pin:null
          });
        }
      });
    });
  });
  // res.render('index',{
  //   doctors:[],
  //   department: [],
  //   loggedin: 0,
  //   admin:0,
  //   days:[],
  //   data: null,
  //   login_as:null,
  //   pin:null
  // });
});

/* POST pin page. */
router.post('/:login_as/:id/:admin/:loggedin/pin', function(req, res, next) {
  var id = req.params.id;
  var pin1 = req.body.pin1;
  var login_as = req.params.login_as;
  var admin = req.params.admin;
  var loggedin = req.params.loggedin;
  PinModel.find({user_id:id},function(err,pin){
    if(err) throw err;
    if(pin[0] == null){
      var data = new PinModel({
        user_id:id,
        pin:pin1
      });
      data.save(function(err){
        if(err) throw err;
        if(!err){
          res.redirect('/'+login_as + '/dashboard/' + id);
        }
      });
    }
  });
});

/* POST message. */
router.post('/message', function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var phone_no = req.body.phone_no;
  var gender = req.body.gender;
  var description = req.body.description;
  var data = new MessageModel({
    name:name,
    phone_no:phone_no,
    email:email,
    gender:gender,
    message:description
  });
  data.save(function(err){
    if(err) throw err;
    if(!err){
      res.redirect('/');
    }
  });
});

router.post('/:login_as/:id/:admin/:loggedin/message', function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var phone_no = req.body.phone_no;
  var gender = req.body.gender;
  var description = req.body.description;
  var data = new MessageModel({
    name:name,
    phone_no:phone_no,
    email:email,
    gender:gender,
    message:description
  });
  data.save(function(err){
    if(err) throw err;
    if(!err){
      res.redirect('/' + req.params.login_as + '/' + req.params.id + '/' + req.params.admin + '/' + req.params.loggedin);
    }
  });
});

/* GET home page. */
router.get('/:login_as/:id/:admin/:loggedin', function(req, res, next) {
  var admin = req.params.admin;
  var loggedin = req.params.loggedin;
  var login_as = req.params.login_as;
  var id = req.params.id;
  if(login_as == "doctor"){
    DoctorModel.findById(id,function(err,data){
      if(err) throw err;
      if(data){
        DaysModel.find(function(err,days){
          DoctorModel.find(function(err,doctors){
            DepartmentModel.find(function(err,department){
              PinModel.find({user_id:id},function(err,pin){
                if(err) throw err;
                if(pin[0] != null){
                  if(department){
                    res.render('index',{
                      doctors:doctors,
                      department: department,
                      loggedin: loggedin,
                      admin:admin,
                      days:days,
                      data:data,
                      login_as:'doctor',
                      pin: pin
                    });
                  }
                } else {
                  if(department){
                    res.render('index',{
                      doctors:doctors,
                      department: department,
                      loggedin: loggedin,
                      admin:admin,
                      days:days,
                      data:data,
                      login_as:'doctor',
                      pin: null
                    });
                  }
                }
              });
            });
          });
        });
      }
    });
  } else if(login_as == "patient"){
    PatientModel.findById(id,function(err,data){
      if(err) throw err;
      if(data){
        DaysModel.find(function(err,days){
          DoctorModel.find(function(err,doctors){
            DepartmentModel.find(function(err,department){
              PinModel.find({user_id:id},function(err,pin){
                if(err) throw err;
                if(pin[0] != null){
                  if(department){
                    res.render('index',{
                      doctors:doctors,
                     department: department,
                      loggedin: loggedin,
                      admin:admin,
                      days:days,
                      data:data,
                      login_as:'patient',
                      pin: pin
                    });
                  }
                } else {
                  if(department){
                    res.render('index',{
                      doctors:doctors,
                     department: department,
                      loggedin: loggedin,
                      admin:admin,
                      days:days,
                      data:data,
                      login_as:'patient',
                      pin: null
                    });
                  }
                }
              });
            });
          });
        });
      }
    });
  } else if(login_as == "admin") {
    AdminModel.findById(id,function(err,data){
      if(err) throw err;
      if(data){
        DaysModel.find(function(err,days){
          DoctorModel.find(function(err,doctors){
            DepartmentModel.find(function(err,department){
              PinModel.find({user_id:id},function(err,pin){
                if(err) throw err;
                if(pin[0] != null){
                  if(department){
                    res.render('index',{
                      doctors:doctors,
                      department: department,
                      loggedin: loggedin,
                      admin:admin,
                      days:days,
                      data:data,
                      login_as:'admin',
                      pin:pin
                    });
                  }
                } else {
                  if(department){
                    res.render('index',{
                      doctors:doctors,
                      department: department,
                      loggedin: loggedin,
                      admin:admin,
                      days:days,
                      data:data,
                      login_as:'admin',
                      pin:null
                    });
                  }
                }
              });
            });
          });
        });
      }
    });
  }
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* GET logout page. */
router.get('/logout', function(req, res, next) {
  res.redirect('/');
});

/* POST login page. */
router.post('/login', function(req, res, next) {
  var name = req.body.name;
  var password = req.body.password;
  var login_as = req.body.login_as;
  if(login_as == "admin"){
    AdminModel.find({username:name},function(err,data){
      if(err) throw err;
      if(data[0] != null){
        if(data[0].password == password){
          res.redirect('/'+ login_as + '/' + data[0]._id + '/' + 1 + '/' + 1);
        } else {
          req.flash('danger','Wrong Password');
          res.redirect('/login');
        }
      } else {
        req.flash('danger','Username Dosenot Exist Please Signup first');
        res.redirect('/login');
      }
    });
  } else if(login_as == "patient"){
    PatientModel.find({$or:[{email:name},{phone_no:name}]},function(err,data){
      if(err) throw err;
      if(data[0] != null){
        if(data[0].password == password){
          admin = 0;
          loggedin = 1;
          res.redirect('/'+ login_as + '/' + data[0]._id + '/' + 0 + '/' + 1);
        } else {
          req.flash('danger','Wrong Password');
          res.redirect('/login');
        }
      } else {
        req.flash('danger','Username Dosenot Exist Please Signup first');
        res.redirect('/login');
      }
    });
  } else if(login_as == "doctor"){
    DoctorModel.find({$or:[{email:name},{phone_no:name}]},function(err,data){
      if(err) throw err;
      if(data[0] != null){
        if(data[0].password == password){
          admin = 0;
          loggedin = 1;
          res.redirect('/'+ login_as + '/' + data[0]._id + '/' + 0 + '/' + 1);
        } else {
          req.flash('danger','Wrong Password');
          res.redirect('/login');
        }
      } else {
        req.flash('danger','Username Dosenot Exist Please Signup first');
        res.redirect('/login');
      }
    });
  } else {
    req.flash('danger','Select a occupation');
    res.redirect('/login');
  }
});

/* GET signup page. */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

/* GET signup page. */
router.post('/signup', function(req, res, next) {
  if(req.body.signUp_as == "patient") {
    var name = req.body.name;
    var email = req.body.email;
    var phone_no = req.body.phone_no;
    var password = req.body.password;
    var age = req.body.age;
    var dob = req.body.dob;
    var gender = req.body.gender;
      PatientModel.find({$or:[{email:email},{phone_no:phone_no}]},function(err,data){
        if(err) throw err;
        if(data[0] != null){
          if(data[0].email == req.body.email && data[0].phone_no != req.body.phone_no){
            req.flash('danger','Email already Exists');
            res.redirect('/signup');
          } else if(data[0].email != req.body.email && data[0].phone_no == req.body.phone_no){
            req.flash('danger','Phone Number already Exists');
            res.redirect('/signup');
          } else if(data[0].email == req.body.email && data[0].phone_no == req.body.phone_no){
            req.flash('danger','Email and Phone Number already Exists');
            res.redirect('/signup');
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
                req.flash('success','Signed Up Successfully');
                res.redirect('/login');
              }
            });
          } else {
            req.flash('danger','Password do not match');
            res.redirect('/signup');
          }
        }
      });
    
  } else if(req.body.signUp_as == "doctor") {
    var name = req.body.name;
    var email = req.body.email;
    var phone_no = req.body.phone_no;
    var password = req.body.password;
    var age = req.body.age;
    var dob = req.body.dob;
    var gender = req.body.gender;
    var approved = "No";
    DoctorModel.find({$or:[{email:email},{phone_no:phone_no}]},function(err,data){
      if(err) throw err;
      if(data[0] != null){
        if(data[0].email == req.body.email && data[0].phone_no != req.body.phone_no){
          req.flash('danger','Email already Exists');
          res.redirect('/signup');
        } else if(data[0].email != req.body.email && data[0].phone_no == req.body.phone_no){
          req.flash('danger','Phone Number already Exists');
          res.redirect('/signup');
        } else if(data[0].email == req.body.email && data[0].phone_no == req.body.phone_no){
          req.flash('danger','Email and Phone Number already Exists');
          res.redirect('/signup');
        }
      } else {
        if(password == req.body.cpassword){
          var doctor_data = new DoctorModel({
            name:name,
            email:email,
            phone_no:phone_no,
            password: password,
            age: age,
            dob:dob,
            gender: gender,
            approved:approved
          });
          doctor_data.save(function(err){
            if(err) throw err;
            if(!err){
              req.flash('success','Signed Up Successfully');
              res.redirect('/signup-doctor/'+ email);
            }
          });
        } else {
          req.flash('danger','Password do not match');
          res.redirect('/signup');
        }
      }
    });
  } else {
    req.flash('danger','Select a occupation');
    res.redirect('/signup');
  }
});

/* GET signup-doctor page. */
router.get('/signup-doctor/:email', function(req, res, next) {
  DepartmentModel.find(function(err,department){
    res.render('signup_doctor',{
      department:department
    });
  });
});

/* POST signup-doctor page. */
router.post('/signup-doctor/:email', function(req, res, next) {
  var imageFile = typeof req.files.image.name !=="undefined" ? req.files.image.name : "" ;
  var degreeFile = typeof req.files.degree_pdf.name !=="undefined" ? req.files.degree_pdf.name : "" ;
  var internFile = typeof req.files.intern_pdf.name !=="undefined" ? req.files.intern_pdf.name : "" ;
  var degree = req.body.degree;
  var college = req.body.college;
  var department = req.body.department;
  var experience = req.body.experience;
  var email = req.params.email;

  DoctorModel.findOneAndUpdate({email:email},{
    deg:degree,
    college:college,
    department:department,
    experience:experience,
    degree_pdf: degreeFile,
    intern_pdf: internFile,
    photo:imageFile
  },function(err,data){
    if(err) throw err;
    if(!err){
      mkdirp('public/doctor_files/' + email, function(err){
        return console.log(err);
      });
    
      mkdirp('public/doctor_files/' + email  + '/gallery', function(err){
        return console.log(err);
      });
    
      mkdirp('public/doctor_files/' + email + '/gallery/thumbs', function(err){
        return console.log(err);
      });
    
      if(imageFile != "" && degreeFile != "" && internFile !=""){
        var Image = req.files.image;
        var Degree = req.files.degree_pdf;
        var Intern = req.files.intern_pdf;
        var path = 'public/doctor_files/' + email + '/' + imageFile;
        var path1 = 'public/doctor_files/' + email + '/' + degreeFile;
        var path2 = 'public/doctor_files/' + email + '/' + internFile;
    
        Image.mv(path, function(err){
          return console.log(err);
        });
        Degree.mv(path1, function(err){
          return console.log(err);
        });
        Intern.mv(path2, function(err){
          return console.log(err);
        });
      }
      req.flash('success','Document Added Successfully');
      res.redirect('/login');
    }
  });
});

/* POST signup page. */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

/*Get Otp*/
router.get('/getOTP/:email',function(req,res,next){
  var otp = Math.floor(Math.random()*100000);
  var email = req.params.email;
  var nodemailer = require('nodemailer');

      var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
            user: 'choudharyaabhas13@gmail.com',			//email ID
            pass: 'Ilovekiddomore1@'				//Password 
          }
      });

      var details = {
        from: 'choudharyaabhas13@gmail.com', // sender address same as above
        to: email, 					// Receiver's email id
        subject: 'Email Verification:',
        text: 'Your Ome Time Password is:' + otp					// Sending OTP 
      };


      transporter.sendMail(details, function (error, data) {
        if(error)
          console.log(error)
        else
          console.log(data);
        });
  res.jsonp(otp);
});

/*Searching Existing users*/
router.get('/searchEmail/:email',function(req,res,next){
  var email = req.params.email;
  PatientModel.find({email:email},function(err,data){
    if(!err){
      res.jsonp(data);
      console.log(data);
    }
  });
});

router.get('/enterPinDoctor/:id1',function(req,res,next){
  var id = req.params.id1;
  PinModel.find({user_id:id},function(err,data){
    if(!err){
      res.jsonp(data);
    }
  });
});

router.get('/enterPinPatient/:id1',function(req,res,next){
  var id = req.params.id1;
  PinModel.find({user_id:id},function(err,data){
    if(!err){
      res.jsonp(data);
    }
  });
});

router.get('/enterPinAdmin/:id1',function(req,res,next){
  var id = req.params.id1;
  PinModel.find({user_id:id},function(err,data){
    if(!err){
      res.jsonp(data);
    }
  });
});

router.get('/searchPhone/:phone',function(req,res,next){
  var phone = req.params.phone;
  PatientModel.find({phone_no:phone},function(err,data){
    if(!err){
      res.jsonp(data);
      console.log(data);
    }
  });
});

router.get('/getTime/:day',function(req,res,next){
  var day = req.params.day;
  DaysModel.find({day:day},function(err,data){
    if(!err){
      res.jsonp(data);
      console.log(data);
    }
  });
});

router.get('/searchEmailDoctor/:email',function(req,res,next){
  var email = req.params.email;
  console.log(email);
  DoctorModel.find({email:email},function(err,data){
    if(!err){
      res.jsonp(data);
      console.log(data);
    }
  });
});

router.get('/searchPhoneDoctor/:phone',function(req,res,next){
  var phone = req.params.phone;
  console.log(phone);
  DoctorModel.find({phone_no:phone},function(err,data){
    if(!err){
      res.jsonp(data);
      console.log(data);
    }
  });
});

module.exports = router;
