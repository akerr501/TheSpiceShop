// This is the node.js server for The Spice Shop Admin website
// Authors: Adam Kerr, Santosh Ramesh
// Created on: 4/25/21

/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
// var exp_handle = require("express-handlebars"); // connect handlebars
var app     = express();            // We need to instantiate an express object to interact with the server in our code
var port    = process.env.PORT || 6969;                 // nice
// app.engine('handlebars', exp_handle({ defualtLayout: "main"})); // set the default layout
// app.set('view engine', 'handlebars'); // idk what these do
app.use(express.json());
app.use(express.static('public'));
// Database
var db = require('./connector'); // connect database

/*
    ROUTES
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
  res.status(200);
  res.render("householdPage", {
    script: "./households.js"
  });
});

// Members route, displays Member table
app.get('/members', function(req, res, next) {
  console.log("Serving the Members Page");
  res.status(200);
  res.render("memberPage", {
    script: "./members.js"
  });
});

// Spices route, displays Spice, Blend, and Spice_Blend tables
app.get('/spices', function(req, res, next) {
  console.log("Serving the Spices Page");
  res.status(200);
  res.render("spicePage", {
    script: "./spices.js"
  });
});

// Blends route, displays Household, Blend, and Household_Blend tables
app.get('/blends', function(req, res, next) {
  console.log("Serving the Blends Page");
  res.status(200);
  res.render("blendPage", {
    script: "./blends.js"
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
