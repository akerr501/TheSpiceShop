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
    GET ROUTES
*/


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
        script: "/households.js",
        households: tempHouseholds,
        household_following: results
      });
    });
  });
});

// Households route, displays Household and Household_Following tables with search input
app.get('/households/:search', function(req, res, next) {
  var search = req.params.search;
  console.log("Serving the Households Searched Page: " + search);
  var query1 = "SELECT * FROM Households WHERE " + '"' + search + '"' + " in (HouseholdID, AddressStreet, AddressCity, AddressState, AddressZip, CreationDate, UserName, Password);";
  var query2 = "SELECT * FROM Household_Followings;";
  db.pool.query(query1, function (err, results, fields){
    var tempHouseholds = results;
    db.pool.query(query2, function (err, results, fields){
      res.status(200);
      res.render("householdPage", {
        script: "/households.js",
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
        script: "/members.js",
        members: tempMembers,
        householdIDs: houseIDs
      });
    });
  });
});

// Members route, displays Member table with search input
app.get('/members/:search', function(req, res, next) {
  var search = req.params.search;
  console.log("Serving the Members Searched Page: " + search);
  var query1 = "SELECT * FROM Members WHERE " + '"' + search + '"' + " in (MemberID, FirstName, MiddleName, LastName, HouseholdID);";
  var query2 = "SELECT * FROM Households;";
  db.pool.query(query1, function (err, results, fields){
    var tempMembers = results;
    db.pool.query(query2, function (err, results, fields){
      var houseIDs = [];
      for(var i = 0; i < results.length; i++)
        houseIDs.push(results[i]["HouseholdID"]);
      res.status(200);
      res.render("memberPage", {
        script: "/members.js",
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
          script: "/spices.js",
          spices: tempSpices,
          blends: tempBlends,
          spice_blends: results
        });
      });
    });
  });
});

// Spices route, displays Spice, Blend, and Spice_Blend tables with search input
app.get('/spices/:search', function(req, res, next) {
  var search = req.params.search;
  console.log("Serving the Members Searched Page: " + search);
  var query1 = "SELECT * FROM Spices WHERE " + '"' + search + '"' + " in (SpiceID, SpiceName, SpiceDescription);";
  var query2 = "SELECT * FROM Blends;";
  var query3 = "SELECT * FROM Spice_Blends;";
  db.pool.query(query1, function (err, results, fields){
    var tempSpices = results;
    db.pool.query(query2, function (err, results, fields){
      var tempBlends = results;
      db.pool.query(query3, function (err, results, fields){
        res.status(200);
        res.render("spicePage", {
          script: "/spices.js",
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
          script: "/blends.js",
          blends: tempBlends,
          households: tempHouseholds,
          household_blends: results
        });
      });
    });
  });
});

// Blends route, displays Household, Blend, and Household_Blend tables with search
app.get('/blends/:search', function(req, res, next) {
  var search = req.params.search;
  console.log("Serving the Blends Searched Page: " + search);
  var query1 = "SELECT * FROM Blends WHERE " + '"' + search + '"' + " in (BlendID, BlendName, Quantity, BlendDescription);";
  var query2 = "SELECT * FROM Households;";
  var query3 = "SELECT * FROM Household_Blends;";
  db.pool.query(query1, function (err, results, fields){
    var tempBlends = results;
    db.pool.query(query2, function (err, results, fields){
      var tempHouseholds = results;
      db.pool.query(query3, function (err, results, fields){
        res.status(200);
        res.render("blendPage", {
          script: "/blends.js",
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


/*
    POST ROUTES
*/


// make Households route, inserts row into Households table from body data
app.post("/makeHouse", function(req, res){
  var d = new Date();
  var date = '"' + (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + '"';
  var query = "INSERT INTO Households (AddressStreet, AddressCity, AddressState, AddressZip, CreationDate, UserName, Password) VALUES (" + req.body.str + ", " + req.body.city + ", " + req.body.state + ", " + req.body.zip + ", STR_TO_DATE(" + date + ", '%m/%d/%Y'), " + req.body.name + ", " + req.body.pwd + ");";
  console.log("Making Household with query: " + query);
  db.pool.query(query, function (err, results, fields){
    res.send(results);
  })
});

// make Households To Households route, inserts row into Households_following table from body data
app.post("/makeHouseToHouse", function(req, res){
  var query = "INSERT INTO Household_Followings (HouseholdID_1, HouseholdID_2) VALUES(" + req.body.hIDO + ", " + req.body.hIDT + ");";
  console.log("Making HouseToHouse with query: " + query);
  db.pool.query(query, function (err, results, fields){
    res.send(results);
  })
});

// make Member route, inserts row into Members table from body data
app.post("/makeMember", function(req, res){
  var query = "INSERT INTO Members (FirstName, MiddleName, LastName, HouseholdID) VALUES(" + req.body.fname + ", " + req.body.mname + ", " + req.body.lname + ", " + req.body.hID+ ");";
  console.log("Making Member with query: " + query);
  db.pool.query(query, function (err, results, fields){
    res.send(results);
  })
});

// make Spice route, inserts row into Spices table from body data
app.post("/makeSpice", function(req, res){
  var query = "INSERT INTO Spices (SpiceName, SpiceDescription) VALUES(" + req.body.s + ", " + req.body.d + ");";
  console.log("Making blend with query: " + query);
  db.pool.query(query, function (err, results, fields){
    res.send(results);
  })
});

// make Spice To Blend route, inserts row into Spice_Blends table from body data
app.post("/makeSpiceToBlend", function(req, res){
  var query = "INSERT INTO Spice_Blends (BlendID, SpiceID) VALUES(" + req.body.bID + ", " + req.body.sID + ");";
  console.log("Making BlendToHouse with query: " + query);
  db.pool.query(query, function (err, results, fields){
    res.send(results);
  })
});

// make Blend route, inserts row into Blends table from body data
app.post("/makeBlend", function(req, res){
  var query = "INSERT INTO Blends (BlendName, Quantity, BlendDescription) VALUES (" + req.body.n + ", " + req.body.q + ", " + req.body.d + ");";
  console.log("Making blend with query: " + query);
  db.pool.query(query, function (err, results, fields){
    res.send(results);
  })
});

// make Blend to Households route, inserts row into Household_Blends table from body data
app.post("/makeBlendToHouse", function(req, res){
  var query = "INSERT INTO Household_Blends (HouseholdID, BlendID) VALUES (" + req.body.hID + ", " + req.body.bID + ");";
  console.log("Making BlendToHouse with query: " + query);
  db.pool.query(query, function (err, results, fields){
    res.send(results);
  })
});

// delete Household route, deletes row into Household table from body data
app.post("/deleteHousehold", function(req, res){
  var query1 = "DELETE FROM Household_Blends WHERE HouseholdID = " + req.body.id + ";";
  var query2 = "DELETE FROM Members WHERE HouseholdID = " + req.body.id + ";";
  var query3 = "DELETE FROM Household_Followings WHERE HouseholdID_1 = " + req.body.id + " OR HouseholdID_2 = " + req.body.id + ";";
  var query4 = "DELETE FROM Households WHERE HouseholdID = " + req.body.id + ";";
  console.log("Deleting Household with query: " + query4);
  db.pool.query(query1, function (err, results, fields){
    db.pool.query(query2, function (err, results, fields){
      db.pool.query(query3, function (err, results, fields){
        db.pool.query(query4, function (err, results, fields){
          res.send(results);
        });
      });
    });
  });
});

// delete Blend route, deletes row into Blend table from body data
app.post("/deleteBlend", function(req, res){
  var query1 = "DELETE FROM Spice_Blends WHERE BlendID = " + req.body.id + ";";
  var query2 = "DELETE FROM Household_Blends WHERE BlendID = " + req.body.id + ";";
  var query3 = "DELETE FROM Blends WHERE BlendID = " + req.body.id + ";";
  console.log("Deleting Blend with query: " + query3);
  db.pool.query(query1, function (err, results, fields){
    db.pool.query(query2, function (err, results, fields){
      db.pool.query(query3, function (err, results, fields){
        res.send(results);
      });
    });
  });
});

// delete Spice route, deletes row into Spice table from body data
app.post("/deleteSpice", function(req, res){
  var query1 = "DELETE FROM Spice_Blends WHERE SpiceID = " + req.body.id + ";";
  var query2 = "DELETE FROM Spices WHERE SpiceID = " + req.body.id + ";";
  console.log("Deleting Spice with query: " + query1);
  db.pool.query(query1, function (err, results, fields){
    db.pool.query(query2, function (err, results, fields){
      res.send(results);
    });
  });
});

// delete Member route, deletes row into Member table from body data
app.post("/deleteMember", function(req, res){
  var query = "DELETE FROM Members WHERE MemberID = " + req.body.id + ";";
  console.log("Deleting Member with query: " + query);
  db.pool.query(query, function (err, results, fields){
    res.send(results);
  });
});

// update Household route, updates row into Household table from body data
app.post("/updateHousehold", function(req, res){
  var query = "UPDATE Households SET " +
  " AddressStreet = " + req.body.str + "," +
  " AddressCity = " + req.body.city + "," +
  " AddressState = " + req.body.state + "," +
  " AddressZip = " + req.body.zip + "," +
  " UserName = " + req.body.name + "," +
  " Password = " + req.body.pwd +
  " WHERE HouseholdID = " + req.body.id + ";";
  console.log("Updating Household with query: " + query);
  db.pool.query(query, function (err, results, fields){
    res.send(results);
  });
});

// update Member route, updates row into Member table from body data
app.post("/updateMember", function(req, res){
  var query = "UPDATE Members SET " +
  " FirstName = " + req.body.fname + "," +
  " MiddleName = " + req.body.mname + "," +
  " LastName = " + req.body.lname +
  " WHERE MemberID = " + req.body.id + ";";
  console.log("Updating Member with query: " + query);
  db.pool.query(query, function (err, results, fields){
    res.send(results);
  });
});

// update Spice route, updates row into Spices table from body data
app.post("/updateSpice", function(req, res){
  var query = "UPDATE Spices SET " +
  " SpiceName = " + req.body.name + "," +
  " SpiceDescription = " + req.body.description +
  " WHERE SpiceID = " + req.body.id + ";";
  console.log("Updating Spice with query: " + query);
  db.pool.query(query, function (err, results, fields){
    res.send(results);
  });
});

// update Blend route, updates row into Blend table from body data
app.post("/updateBlend", function(req, res){
  var query = "UPDATE Blends SET " +
  " BlendName = " + req.body.name + "," +
  " Quantity = " + req.body.quantity + "," +
  " BlendDescription = " + req.body.description +
  " WHERE BlendID = " + req.body.id + ";";
  console.log("Updating Blend with query: " + query);
  db.pool.query(query, function (err, results, fields){
    res.send(results);
  });
});


// Listen to the port defined at top
app.listen(port, function(){
  console.log("Server is listening on this port:", port);
});
