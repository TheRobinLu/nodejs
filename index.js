const express = require('express');
const app = express();
const port = 8081;

var cb0 = function(req, res,next)
{
    console.log("CB0")
    next()
}

var cb1 = function(req, res,next)
{
    console.log("CB1")
    next()
}

var cb2 = function(req, res,next)
{
    res.send('THis Last CB');
}


app.get('/a/', (req,res) => res.send('Hello World'));
app.get('/ab?cd/', (req,res) => {
    console.log('aaaa');
    res.send('whatever b is there or not')});
app.get('/ab+cd/', (req,res) => res.send('However many bs'));

app.get('/users/:userid/books/:bookid', function(req,res) {res.send(req.params);})

app.get("/CB", [cb0, cb1, cb2])
app.get("/CBCombine", [cb0, cb1], function(req,res,next){
    console.log('Go next');
    next()
}, function(req,res){ res.send('Call independent function---')})

app.listen(port,() => console.log(`Server listening on port ${port}!`));

