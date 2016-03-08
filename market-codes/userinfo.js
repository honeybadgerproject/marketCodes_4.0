exports.setUserInfo = function(app, dbuserinfo) {

  // create a new project
  app.post('/mainuserinfo', function(req, res) {
    console.log("2.>>>>>> inserting mainuserinfo");
    console.log(req.body);
    // check if the user exist if not insert
    var exist = false;
    //var bodyInfo = req.body;

/*    var mainuserinfo = {
      user_name: UserFacebookID.user.name,
      user_owner: UserFacebookID.user.id,
      user_email: UserFacebookID.email
    }*/

    console.log("find a user by.....");
    dbuserinfo.userinfo.findAndModify({
      query: {user_owner: req.body.user_owner},
      update: {
        $setOnInsert: { user_name: req.body.user_name, user_email: req.body.user_email, user_owner: req.body.user_owner }
      },
      new: true,
      upsert: true
    });

  });

};
