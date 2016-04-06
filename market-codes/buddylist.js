exports.setBuddy = function(app, dbbuddy) {

  app.post('/buddylistowner', function(req, res) {
    console.log("request");
    var id = req.body.user_owner;
    var id2 = req.body.project_id;

    dbbuddy.buddylist.find( { "id_project": id2 , "role": "super"} , function(err, docs) {
      console.log(docs);
      res.json(docs);
    });
  });

  app.post('/buddylist', function(req, res) {
    console.log(req.body);
    dbbuddy.buddylist.insert(req.body, function(err, doc) {
      res.json(doc);
    });
  });

  app.delete('/buddylist/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
      dbbuddy.buddylist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
      res.json(doc);
    });
  });
};
