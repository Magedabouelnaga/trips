
var express = require('express');
const { Db } = require('mongodb');
var path = require('path');
var app = express();
var alert = require('alert');
const session = require('express-session');
const PORT = process.env.PORT || 3030;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name: 'Aly', 
  secret: 'Maged',
  resave: false,
  saveUninitialized: false,
}));





app.get('/', function(req,res){
  res.render('login')
});


app.post('/', function(req,res){
  var x = req.body.username;
  var y = req.body.password;
  //console.log(x);
  //console.log(y);
  if(x==="" && y ==="") alert("Cannot login");
 else if(x===""&& y !=="") alert("Enter your username");
 else if(x!==""&& y ==="") alert("Enter your password");
 else{ var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://127.0.0.1:27017/", function(err, client){
    if(err) throw err;
    var db = client.db('myDB');
   db.collection('FirstCollection').findOne({username: x}, (err, checkuser) => {
    if(checkuser === null && checkuser === ""){
      alert("You are not registered");
      res.redirect('registration');
    }

    else{
      db.collection('FirstCollection').findOne({Username: x, Password: y}, (err, checkpassword) => {
      if(checkpassword === null) alert("Incorrect Password");
      else{
        req.session.miro=true;
        req.session.username= req.session.username;
         res.render('home');
        }
      });
    };
  });
});
 };
});

app.get('/home',function(req,res){
  if(req.session.miro)
  res.render('home');
  else
  res.redirect('/login');
});


app.get('/hiking', function(req,res){
  if(req.session.miro)
  res.render('hiking');
  else
  res.redirect('/login');});

app.get('/cities', function(req,res){
  if(req.session.miro)
  res.render('cities');
  else
  res.redirect('/login');});

app.get('/islands', function(req,res){
  if(req.session.miro)
  res.render('islands');
  else
  res.redirect('/login');});

app.get('/annapurna', function(req,res){
  if(req.session.miro)
  res.render('annapurna');
  else
  res.redirect('/login');});

app.post('/annapurna', function(req, res){
  document.getElementById("wanttogo").addEventListener('click', function(){
    alert("added")
  });
});

app.get('/bali', function(req,res){
  if(req.session.miro)
  res.render('bali');
  else
  res.redirect('/login');});

app.get('/inca', function(req,res){
  if(req.session.miro)
  res.render('inca');
  else
  res.redirect('/login');});

app.get('/paris', function(req,res){
  if(req.session.miro)
  res.render('paris');
  else
  res.redirect('/login');});

app.get('/rome', function(req,res){
  if(req.session.miro)
  res.render('rome');
  else
  res.redirect('/login');});

app.get('/santorini', function(req,res){
  if(req.session.miro)
  res.render('santorini');
  else
  res.redirect('/login');});

  app.get('/wanttogo' ,function(req,res){
    var MongoClient= require('mongodb').MongoClient;
  MongoClient.connect("mongodb://127.0.0.1:27017", function (err,client){
    if(err) throw err;
    var db= client.db('myDB');
    db.collection('myCollection').findOne({username :req.session.miro}, (err,results) => {
    if(err) throw err;
    if(req.session.miro)
    res.render('wanttogo', {wanto: results.wanto});
  
    else
    res.redirect('/login');
  });
  }); 
  });
  

app.post('/wanttogo', function(req, res){
  if(req.body.annapurna){
    db.collection('FirstCollection').findOne({Username:req.session.username}, (err, results) =>{
      if(err) throw err;
      if(results.wanto.includes("annapurna")){
        alert("Already exists");
      }
      else{
      db.collection('FirstCollection').updateOne({Username: req.session.username},{$push:{wanto: "annapurna"} } )
      }
    });
    }
  else if(req.body.bali){
    db.collection('FirstCollection').findOne({Username:req.session.username}, (err, results) =>{
      if(err) throw err;
      if(results.wanto.includes("bali")){
        alert("Already exists");
      }
      else{
      db.collection('FirstCollection').updateOne({Username: req.session.username},{$push:{wanto: "bali"} } )
      }
    });
    }
  else if(req.body.inca){
    db.collection('FirstCollection').findOne({Username:req.session.username}, (err, results) =>{
      if(err) throw err;
      if(results.wanto.includes("inca")){
        alert("Already exists");
      }
      else{
      db.collection('FirstCollection').updateOne({Username: req.session.username},{$push:{wanto: "inca"} } )
      }
    });
    }
  else if(req.body.paris){
  db.collection('FirstCollection').findOne({Username:req.session.username}, (err, results) =>{
    if(err) throw err;
    if(results.wanto.includes("paris")){
      alert("Already exists");
    }
    else{
    db.collection('FirstCollection').updateOne({Username: req.session.username},{$push:{wanto: "paris"} } )
    }
  });
  }
  else if(req.body.rome){
    db.collection('FirstCollection').findOne({Username:req.session.username}, (err, results) =>{
      if(err) throw err;
      if(results.wanto.includes("rome")){
        alert("Already exists");
      }
      else{
      db.collection('FirstCollection').updateOne({Username: req.session.username},{$push:{wanto: "rome"} } )
      }
    });
    }
  else if(req.body.santorini){
    db.collection('FirstCollection').findOne({Username:req.session.username}, (err, results) =>{
      if(err) throw err;
      if(results.wanto.includes("santorini")){
        alert("Already exists");
      }
      else{
      db.collection('FirstCollection').updateOne({Username: req.session.username},{$push:{wanto: "santorini"} } )
      }
    });
    }



//db.collection('FirstCollection').insertOne({Username: req.session.username, wanto.add});
});


app.get('/searchresults', function(req,res){
  if(req.session.miro)
  res.render('searchresults');
  else
  res.redirect('/login');
});

app.post('/search',function(req,res){
  const inp = req.body.Search;
  const low = inp.toLowerCase();
  var arr = new Array();
  var err = new Array("empty");
  const cities=["paris","rome","santorini","bali","inca","annapurna"];
  cities.forEach(cities=>{ if(cities.includes(low)) arr.push(cities);
  });
  if(arr.length<=0){
    res.render('searchresults',{fin:new Array("empty")});
  }
  else{
    res.render('searchresults',{fin:arr});
  }
  });



app.get('/registration', function(req,res){

  res.render('registration');
});

app.post('/register', function(req,res){
  var x = req.body.username;
  var y = req.body.password;
  var wanto=new Array();
 // console.log(x);
  //console.log(y);
  if(x==="" && y ==="") alert("Cannot register");
 else if(x===""&& y !=="") alert("Enter your username");
 else if(x!==""&& y ==="") alert("Enter your password");
 else{ var MongoClient = require('mongodb').MongoClient;
   MongoClient.connect("mongodb://127.0.0.1:27017/", function(err, client){
    if(err) throw err;
    var db = client.db('myDB');

    db.collection('FirstCollection').findOne({username: req.body.username}, (err, checkuser1) => {
    if(checkuser1 === null && checkuser1 ===""){
      db.collection('FirstCollection').insertOne({Username: x, Password: y,Arrai: wanto});
      res.render('login');
      console.log(checkuser1);
  }

    else{
      alert("This username is used, please choose another one");
      res.render('registration');
      console.log(checkuser1);
      
    }
       });
    });
  }
  });
  




  




app.listen(3000);
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
   // db.collection('FirstCollection').find().toArray(function (err,results){
     // console.log(results);


 








//if(process.env.PORT){
  //app.listen(process.env.PORT, function() {console.log('Server started')});
//}
//else{
  //app.listen(3000, function() {console.log('Server started on port 3000')});
//}
