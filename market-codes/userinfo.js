exports.setUserInfo = function(app, dbuserinfo) {

  // create a new project
  app.post('/mainuserinfo', function(req, res) {
    console.log(req.body);
    dbuserinfo.userinfo.insert(req.body, function(err, doc) {
      res.json(doc);
    });
  });

};
