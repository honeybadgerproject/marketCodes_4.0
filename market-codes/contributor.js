exports.setContributor = function(app, db) {



    app.post('/contributorslistowner', function(req, res) {

      console.log(req.body.project_id);
      console.log(req.body.user_owner);
      var id = req.body.user_owner;
      var id2 = req.body.project_id;

      db.projectlist.find({ "user_owner": id , "id_project": id2} , function(err, docs) {
        console.log("request for contributors");
        console.log(docs);
        res.json(docs);
      });
    });

    app.post('/contributorslist', function(req, res) {
      console.log(req.body);
      db.projectlist.update({"_id" : req.body.id_project } ,
                                    { $push: { "user_owner": req.body.linkContributor  }} ,
                                  function(err, doc) {
                                      res.json(doc);
                                    });
    /*  dbctr.contributorslist.insert(req.body, function(err, doc) {
        res.json(doc);
      });*/
    });


    app.delete('/contributorslist/:id', function(req, res) {
      /*var id = req.params.id;
      console.log(id);
      db.projectlist.remove({"_id" : req.body.id_project } ,
                                    { $pull: { "user_owner": linkContributor  }} ,
                                  function(err, doc) {
                                      res.json(doc);
                                    });*/
    });

 };
