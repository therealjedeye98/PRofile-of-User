//requiring all packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
 

const app = express();

var urlencodedParser = bodyParser.urlencoded({extended:false});


//Database and Models
mongoose.connect("mongodb+srv://user0:<981126sk>@cluster0-wc1mj.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));



const getTodo = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let error = false;
            if(!error)
                resolve({ text: 'Complete Code Example' })
            else
                reject()
        }, 3000)     
    })
}

async function fetchTodo () {
    const todo = await getTodo()
    return todo
}

fetchTodo().then(todo => console.log(todo.text))


var DetailsSchema = new mongoose.Schema({
    Name: String,
    Surname: String,
    Email: String,
    Age: Number,
    Password: String
});

var ProfileSchema = new mongoose.Schema({
    Name: String,
    Surname: String,
    Email: String,
    Age: Number,
    Degree: String,
    FavouriteCourse: String
});


var Details = mongoose.model('Details', DetailsSchema);
var Profiles = mongoose.model("Profiles", ProfileSchema);

module.exports = DetailsSchema;
module.exports = ProfileSchema;

//routes

app.use(session({secret: 'secret' , resave:false, saveUninitialized: false}));
app.use('/assets', express.static('assets'));
app.set('view engine','ejs');

app.get('/', function(req,res){
    res.render("SignUp",{Error:'Sign Up now!!'});
});

app.get('/SignIn', function(req,res){
    res.render('SignIn',{Status_CHeck: "Sign in"});
});

app.get('/ProfilePage', urlencodedParser, function(req){
    Profiles.findOneAndUpdate({Email:req.session.message}, { "$set": { Name:req.body.Name, Surname:req.body.Surname,Age:req.body.Age,Degree:req.body.Degree,FavouriteCourse:req.body.FavouriteCourse}}).exec(function(err){
        if (err) throw err;
    });
});

/////////////////////////////    //////////////////////////////////////

app.post('/SignIn',urlencodedParser,function(req,res){
    var test = {Email:req.body.login,Password:req.body.passwrd}
});

app.post('/',urlencodedParser,function(req,res){
  var test = {Email:req.body.Email};
})


console.log("Now listening on port 3000");
app.listen(process.env.PORT || 3000);