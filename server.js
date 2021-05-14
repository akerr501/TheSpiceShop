// This is the node.js server for The Spice Shop Admin website
// Authors: Adam Kerr, Santosh Ramesh
// Created on: 4/25/21

/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
var exp_handle = require("express-handlebars"); // connect handlebars
var app     = express();            // We need to instantiate an express object to interact with the server in our code
var port    = process.env.PORT || 6969;                 // nice
app.engine('handlebars', exp_handle({ defualtLayout: "main"})); // set the default layout
app.set('view engine', 'handlebars'); // idk what these do
app.use(express.json());
app.use(express.static('public'));
// Database
var db = require('./connector'); // connect database

/*
    ROUTES
*/

var spices = [
  {"SpiceID": 0, "SpiceName": "Paprika", "SpiceDescription": "Spicy"},
  {"SpiceID": 1, "SpiceName": "Curry Powder", "SpiceDescription": "smells like curry"}
];
var blends = [
  {"BlendID": 0, "BlendName": "Spicy Blend", "Quantity": 2, "BlendDescription": "very spicy"},
  {"BlendID": 1, "BlendName": "not so Spicy Blend", "Quantity": 2, "BlendDescription": "not very spicy"}
];
var households = [
  {"HouseholdID": 0, "AddressStreet": "idk", "AddressCity": "idk", "AddressState": "idk", "AddressZip": "idk", "CreationDate": "idk", "UserName": "coolhouse", "Password": "1234"},
  {"HouseholdID": 1, "AddressStreet": "idk", "AddressCity": "idk", "AddressState": "idk", "AddressZip": "idk", "CreationDate": "idk", "UserName": "coolhouse2", "Password": "1234"},
];
var members = [
  {"MemberID": 0, "FirstName": "Adam", "MiddleName": "Christopher", "LastName": "Kerr", "HouseholdID": 0},
  {"MemberID": 1, "FirstName": "Santosh", "MiddleName": "","LastName": "Ramesh", "HouseholdID": 1},
  {"MemberID": 2, "FirstName": "Peter", "MiddleName": "","LastName": "Parker", "HouseholdID": 0},
  {"MemberID": 3, "FirstName": "John", "MiddleName": "","LastName": "Smith", "HouseholdID": 1},
  {"MemberID": 4, "FirstName": "Billy", "MiddleName": "","LastName": "Batson", "HouseholdID": 1}
];
var spice_blends = [
  {"BlendID": 0, "SpiceID": 0},
  {"BlendID": 0, "SpiceID": 1},
  {"BlendID": 1, "SpiceID": 0},
  {"BlendID": 1, "SpiceID": 1}
];
var household_following = [
  {"HouseholdID_1": 0, "HouseholdID_2": 1},
  {"HouseholdID_1": 1, "HouseholdID_2": 0}
];
var household_blends = [
  {"HouseholdID": 0, "BlendID": 0},
  {"HouseholdID": 0, "BlendID": 1},
  {"HouseholdID": 1, "BlendID": 1},
];


// Default route, index/home page of the website
app.get('/', function(req, res, next) {
  console.log("Serving the Home Page");
  res.status(200);
  res.render("homePage", {
  });
});

// Households route, displays Household and Household_Following tables
app.get('/households', function(req, res, next) {
  console.log("Serving the Households Page");
  var query1 = "SELECT * FROM Households;";
  var query2 = "SELECT * FROM Household_Followings;";
  db.pool.query(query1, function (err, results, fields){
    var tempHouseholds = results;
    db.pool.query(query2, function (err, results, fields){
      res.status(200);
      res.render("householdPage", {
        script: "./households.js",
        households: tempHouseholds,
        household_following: results
      });
    });
  });
});

// Members route, displays Member table
app.get('/members', function(req, res, next) {
  console.log("Serving the Members Page");
  var query1 = "SELECT * FROM Members;";
  var query2 = "SELECT * FROM Households;";
  db.pool.query(query1, function (err, results, fields){
    var tempMembers = results;
    db.pool.query(query2, function (err, results, fields){
      var houseIDs = [];
      for(var i = 0; i < results.length; i++)
        houseIDs.push(results[i]["HouseholdID"]);
      res.status(200);
      res.render("memberPage", {
        script: "./members.js",
        members: tempMembers,
        householdIDs: houseIDs
      });
    });
  });
});

// Spices route, displays Spice, Blend, and Spice_Blend tables
app.get('/spices', function(req, res, next) {
  console.log("Serving the Spices Page");
  var query1 = "SELECT * FROM Spices;";
  var query2 = "SELECT * FROM Blends;";
  var query3 = "SELECT * FROM Spice_Blends;";
  db.pool.query(query1, function (err, results, fields){
    var tempSpices = results;
    db.pool.query(query2, function (err, results, fields){
      var tempBlends = results;
      db.pool.query(query3, function (err, results, fields){
        res.status(200);
        res.render("spicePage", {
          script: "./spices.js",
          spices: tempSpices,
          blends: tempBlends,
          spice_blends: results
        });
      });
    });
  });
});

// Blends route, displays Household, Blend, and Household_Blend tables
app.get('/blends', function(req, res, next) {
  console.log("Serving the Blends Page");
  var query1 = "SELECT * FROM Blends;";
  var query2 = "SELECT * FROM Households;";
  var query3 = "SELECT * FROM Household_Blends;";
  db.pool.query(query1, function (err, results, fields){
    var tempBlends = results;
    db.pool.query(query2, function (err, results, fields){
      var tempHouseholds = results;
      db.pool.query(query3, function (err, results, fields){
        res.status(200);
        res.render("blendPage", {
          script: "./blends.js",
          blends: tempBlends,
          households: tempHouseholds,
          household_blends: results
        });
      });
    });
  });
});

// Any other route not defined above, give the error page
app.get('*', function(req, res){
  console.log("Serving the 404 Page");
  res.status(404);
  res.render('404Page', {
  });
});

// Listen to the port defined at top
app.listen(port, function(){
  console.log("Server is listening on this port:", port);
})
