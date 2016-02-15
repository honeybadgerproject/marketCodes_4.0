exports.setHackingList = function(app, dbsrc) {
	  
	/**** start resource section ****/

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
	
	/*app.delete('/resourcelist/:id', function(req, res) {
	    var id = req.params.id;
	    console.log(id);
	    dbsrc.resourcelist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
	      res.json(doc);
	    });
	 });*/
  };