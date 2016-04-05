var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongojs = require('mongojs');
var db = mongojs('projectlist', ['projectlist']);
var dbsrc = mongojs('resourcelist', ['resourcelist']);
var dbtab = mongojs('notelist', ['notelist']);
var dbtabprivate = mongojs('notelistprivate', ['notelistprivate']);

var dbuserinfo = mongojs('userinfo', ['userinfo']);   // store the basic information of user




app.use(express.static(__dirname + "/src"));
app.use(bodyParser.json());

/********  models *********/

var userinfo = require('./market-codes/userinfo').setUserInfo(app, dbuserinfo);

var projectlist = require('./market-codes/projectlist').setProjectList(app, db);
var resources = require('./market-codes/resources').setResources(app, dbsrc);
var resources = require('./market-codes/contributor').setContributor(app, db);
var tabs = require('./market-codes/tablist').setTabs(app, dbtab);
var privatetabs = require('./market-codes/privatetablist').setPrivateTabs(app, dbtabprivate);

/******** projectlist ******/



//var projectlist = require('./market-codes/projectlist')(app, db);
//var hackinglist = require('./market-codes/hackingzone')(app, dbsrc);


/**************************/

app.listen(3000);
console.log("Server running port 3000");
