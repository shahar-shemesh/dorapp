
// import express from "express";
// import bodyParser from "body-parser";
// import ejs from "ejs";
// import _ from "lodash";

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { forEach } = require("lodash");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = 'Hi. I’m Dor Shemesh. My specializations include branding and \n'+
'advertising, design strategies, and user experience. I bring \n'+
'thought, relevance, and style to the brands. My goal is to define \n'+
'the most important, genuine quality with which to tell a brand\'s \n'+
'story intuitively.\n'+
'\n'+
'Branding is not just a profession for me; it\'s a passion. I firmly believe that a well-crafted \n'+
'brand has the power to shape perceptions, evoke emotions, and establish strong \n'+
'connections with its target audience. By carefully analyzing the essence of each brand I \n'+
'work with, I strive to define its most important and genuine qualities. This allows me to \n'+
'develop a brand narrative that resonates with customers on a deep and meaningful level, \n'+
'forging lasting connections and loyalty';

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


var posts = [];


app.get("/", function(req, res){
  res.render('home', 
    {
      page_name: "home" ,
      content: homeStartingContent,
      posts: posts
    }
  );
});

app.get("/about", function(req, res){
  res.render('about', {page_name: "about" ,content: aboutContent});
});

app.get("/contact", function(req, res){
  res.render('contact', {page_name: "contact" ,content: contactContent});
});

app.get("/compose", function(req, res){
  res.render('compose');
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postText
  };
  posts.push(post);
  console.log(post);
  res.redirect('/');
});

app.get('/posts/:postTitle', (req, res) => {

  const requestTitle = _.lowerCase(req.params.postTitle);
  console.log(requestTitle); 

  posts.forEach(post => {

    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestTitle ) {
      res.render('post', {title: post.title, content: post.content});
      
    };

    
  });
  res.redirect('/');
  
});



app.listen(process.env.PORT || 5000, function() {
  console.log("App is running");
});
