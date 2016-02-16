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

 /**** start tab section ****/

 app.post('/notelistowner', function(req, res) {
   console.log("request");
   var id = req.body.user_owner;
   var id2 = req.body.project_id;

   dbtab.notelist.find( { "user_owner": id, "id_project": id2} , function(err, docs) {
     console.log(docs);
     res.json(docs);
   });
 });

 app.post('/notelist', function(req, res) {
   console.log(req.body);
   dbtab.notelist.insert(req.body, function(err, doc) {
     res.json(doc);
   });
 });


 app.delete('/notelist/:id', function(req, res) {
   var id = req.params.id;
   console.log(id);
   dbtab.notelist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
     res.json(doc);
   });
 });

 app.get('/notelist/:id', function(req, res) {
   var id = req.params.id;
   console.log(id);
   console.log("into server");
   dbtab.notelist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
     res.json(doc);
   });
 });

 app.put('/notelist/:id', function(req, res) {
   var id = req.params.id;
   console.log(req.body.tab_name);
   dbtab.notelist.findAndModify({query: {_id: mongojs.ObjectId(id)},
     update: {$set: {user_owner: req.body.user_owner, id_tab: req.body.id_tab,
       tab_name: req.body.tab_name, tab_content: req.body.tab_content}},
     new: true}, function(err, doc) {
     res.json(doc);
   });
 });


 /**** start tab private section ****/

 app.post('/notelistownerprivate/:listParams', function(req, res) {
   var id = req.body.user_owner;
   var id2 = req.body.project_id;

   dbtabprivate.notelistprivate.find( { "user_owner": id , "id_project": id2} , function(err, docs) {
     console.log(docs);
     res.json(docs);
   });
 });

 app.post('/notelistprivate', function(req, res) {
   console.log(req.body);
   dbtabprivate.notelistprivate.insert(req.body, function(err, doc) {
     res.json(doc);
   });
 });


 app.delete('/notelistprivate/:id', function(req, res) {
   var id = req.params.id;
   console.log(id);
   dbtabprivate.notelistprivate.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
     res.json(doc);
   });
 });

 app.get('/notelistprivate/:id', function(req, res) {
   var id = req.params.id;
   console.log(id);
   console.log("into server");
   dbtabprivate.notelistprivate.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
     res.json(doc);
   });
 });

 app.put('/notelistprivate/:id', function(req, res) {
   var id = req.params.id;
   console.log(req.body.tab_name);
   dbtabprivate.notelistprivate.findAndModify({query: {_id: mongojs.ObjectId(id)},
     update: {$set: {user_owner: req.body.user_owner, id_tab: req.body.id_tab,
       tab_name: req.body.tab_name, tab_content: req.body.tab_content}},
     new: true}, function(err, doc) {
     res.json(doc);
   });
 });



//var projectlist = require('./market-codes/projectlist')(app, db);
//var hackinglist = require('./market-codes/hackingzone')(app, dbsrc);


/**************************/

app.listen(3000);
console.log("Server running port 3000");
