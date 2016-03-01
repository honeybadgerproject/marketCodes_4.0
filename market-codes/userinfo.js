exports.setUserInfo = function(app, dbuserinfo) {

  // create a new project
  app.post('/mainuserinfo', function(req, res) {
    console.log("2.>>>>>> inserting mainuserinfo");
    console.log(req.body);
    // check if the user exist if not insert
    var exist = false;

/*    var mainuserinfo = {
      user_name: UserFacebookID.user.name,
      user_owner: UserFacebookID.user.id,
      user_email: UserFacebookID.email
    }*/

    console.log("find a user by.....");
    dbuserinfo.userinfo.findOne({user_owner: req.body.user_owner}, function(err, doc) {
      res.json(doc);
      console.log(doc);
      if(doc == {}) {
        dbuserinfo.userinfo.insert(req.body, function(err, doc) {
          res.json(doc);
          console.log(doc);
          console.log("inserted");
        });
      }
      else {
        console.log("not inserted");
      }
    });

  });

};
