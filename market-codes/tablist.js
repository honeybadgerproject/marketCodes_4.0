exports.setTabs = function(app, dbtab) {

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


};
