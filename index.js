/* jshint esversion : 6 */

// @root/index.js

const express = require("express");
const port = 8081;
const app = express();
const baseURL = `http://localhost:${port}`;
const api = require(__dirname + "/api")(app);
const bodyParser = require('body-parser');
const mailer = require("./service/mailer")


// APP CONFIG !!!

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(api.prefix, api.routers);
app.set('view engine', 'ejs'); // CHECK THE DOC http://ejs.co/
app.set('views', __dirname + '/view'); //  précise à express le dossier des vues
// définition de ressources statiques...
app.use('/ejs', express.static(__dirname + '/node_modules/ejs'));
app.use(express.static(__dirname + '/public'));

// TEMPLATE VARS !!!
// Accessibles dans tout le template via app.locals (API express)
app.locals.site = {};
app.locals.baseURL = baseURL;
app.locals.site.title = "JS - Simple Express Template";
app.locals.site.description = "application utilisant node, express JS, ejs et mysql.";
app.locals.site.nav = [
  {label: "accueil", route: "/"},
  {label: "les pays", route: "country"},
  {label: "les utilisateurs", route: "user"},
  {label: "les factures", route: "bill"},
  {label: "nous-contacter", route: "contact"},
  {label: "login", route: "/"},
];

// ROUTES DES PAGES DE l'APPLICATION
app.get('/', function(req, res) {
  res.render('index', {nom: "guillaume"});
  // on passe un objet ({nom: "gui"}) à la vue, utilisable dans le template EJS
});

app.get('/country', function(req, res) {
  res.render('country', {title: "Country !!!"});
});

app.get('/user', function(req, res) {
  res.render('user', {title: "User !!!"});
});

app.get('/bill', function(req, res) {
  res.render('bill');
});

app.get('/contact', function(req, res) {
  res.render('contact');
});

app.post('/contact', function (req, res) {

    const result = mailer({
        from: req.body.mail,
//        to: req.body.destination,
        subject: req.body.object,
//        text: req.body.message,
        message: req.body.message
    });
    console.log(result);
    res.send({});
});



app.listen(port, function() {
  console.log("node server started on port " + port);
});
