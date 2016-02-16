var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongojs = require('mongojs');
var db = mongojs('projectlist', ['projectlist']);
var dbsrc = mongojs('resourcelist', ['resourcelist']);



app.use(express.static(__dirname + "/src"));
app.use(bodyParser.json());

/********  models *********/

/******** projectlist ******/

app.get('/refreshProjectWithUser/:id', function(req, res) {
  var id = req.params.id;

  db.projectlist.find({$or: [{user_owner:{owner:id, role: "admin"}},{user_owner:{owner:id, role: "super"}}]} , function(err, docs) {
    res.json(docs);
  });

});

// create a new project
app.post('/projectlist', function(req, res) {
  console.log(req.body);
  db.projectlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

// delete a project
app.delete('/projectlist/:id', function(req, res) {
  var id = req.params.id;
    console.log(id);
    db.projectlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
      res.json(doc);
    });
});

/******* hackingzonelist (resources) **********/

app.post('/resourcelistowner', function(req, res) {
    console.log("request");
    var id = req.body.user_owner;
    var id2 = req.body.project_id;

    dbsrc.resourcelist.find( { "user_owner": id , "id_project": id2 } , function(err, docs) {
      console.log(docs);
      res.json(docs);
    });
});

app.post('/resourcelist', function(req, res) {
  console.log(req.body);
  dbsrc.resourcelist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/resourcelist/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    dbsrc.resourcelist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
      res.json(doc);
    });
 });



//var projectlist = require('./market-codes/projectlist')(app, db);
//var hackinglist = require('./market-codes/hackingzone')(app, dbsrc);


/**************************/

app.listen(3000);
console.log("Server running port 3000");
