const express = require("express");
const mustacheExpress = require("mustache-express");
const app = express();

app.engine('mustache', mustacheExpress( 'views/partials/', '.mustache'));

app.set('views', __dirname + "/views");
app.set('view engine', 'mustache');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index',{
        page: "Home",
        name: "Melvin",
        dogs: [
            { name: "diederik" },
            { name: "jamie" },
            { name: "johan" },
            { name: "kieran" },
            { name: "richard" }
        ],
        alert: {
            title: "Under Construction",
            body: "This site is under construction and might now work properly."
        }
    });
});

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/register', (req, res) => {
    res.send('NOT IMPLEMENTED: Register');
})

app.get('/password-forget', (req, res) => {
    res.send('NOT IMPLEMENTED: Password Forget');
})

app.get('/overview', (req, res) => {
    res.send('NOT IMPLEMENTED: Overview');
})

app.get('/profile/:id', (req, res) => {
    res.send(`NOT IMPLEMENTED: Profile. id: ${req.params.id}`)
})

app.get('*', (req, res) => {
    res.status(404);
    res.render('404', {
        alert: {
            title: "404 not found",
            body: "This page has not been found. Sorry!"
        }
    });
})

app.listen(3000, () => console.log("Server started on port: 3000"));
