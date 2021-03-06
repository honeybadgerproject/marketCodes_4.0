exports.setPrivateTabs = function(app, dbtabprivate) {

  app.post('/notelistownerprivate', function(req, res) {

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


};
