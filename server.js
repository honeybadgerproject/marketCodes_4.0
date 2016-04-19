var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongojs = require('mongojs');
var db = mongojs('projectlist', ['projectlist']);
var dbsrc = mongojs('resourcelist', ['resourcelist']);
var dbtab = mongojs('notelist', ['notelist']);
var dbtabprivate = mongojs('notelistprivate', ['notelistprivate']);
var dbbuddy = mongojs('buddylist', ['buddylist']);
//var dbbuddy = mongojs('contributorlist', ['contributorlist']);
var dbuserinfo = mongojs('userinfo', ['userinfo']);   // store the basic information of user
var dbbraintree = mongojs('transactions', ['transactions']);

/******** braintree *******/

var config = {
  environment: 'Sandbox',
  publicKey: 'w9kvxgpmbsrf594z',
  privateKey: 'cbefff229a42fa94c3138a70584229bf',
  merchantId: '8z89z5gg7zt6x8x8'
};
var gateway = require('braintree-js')(config);

/***************************/



app.use(express.static(__dirname + "/src"));
app.use(bodyParser.json());



/********  models *********/

var userinfo = require('./market-codes/userinfo').setUserInfo(app, dbuserinfo);

var projectlist = require('./market-codes/projectlist').setProjectList(app, db);
var resources = require('./market-codes/resources').setResources(app, dbsrc);
var tabs = require('./market-codes/tablist').setTabs(app, dbtab);
var privatetabs = require('./market-codes/privatetablist').setPrivateTabs(app, dbtabprivate);
var buddy = require('./market-codes/buddylist').setBuddy(app, dbbuddy);
var transaction = require('./market-codes/transaction').setBraintree(app, dbbraintree, gateway);

/******** projectlist ******/



//var projectlist = require('./market-codes/projectlist')(app, db);
//var hackinglist = require('./market-codes/hackingzone')(app, dbsrc);


/**************************/

app.listen(3000);
console.log("Server running port 3000");
