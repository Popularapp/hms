var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://aabhas1234:aabhas1234@cluster0.awfui.mongodb.net/hospital?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});


module.exports = mongoose;
