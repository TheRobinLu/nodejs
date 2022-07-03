
const fs = require('fs')
const express = require('express');
const app = express();
const port = 8082;
const bodyParser = require('body-parser');
const { fstat } = require('fs');
app.use(bodyParser.json());

app.use(function (err,req,res,next) {
    console.error(err.stack)
    console.log('error in use')
    res.status(500).send('Something Block')
    //res.render('error', {error:err})
})

app.get('/', function(req,res){
    throw new Error('BROCKEN')
})

app.get('/file', function(req,res,next){

    fs.readFile('package-lock.json', function(err,data)
    {
        if(err)
        {
            next(err)
        }
        else
        {
            res.send(data)  //dowload file to local
        }
    })
})

app.get('/trycatch', function(req,res,next){
    setTimeout(function(){
        try{
            throw new Error('BROCKEN')           
        }
        catch(err){
            next(err)

        }
    }, 100)
} )


app.get('/promise', function(req,res,next){
    Promise.resolve().then(function(){
        throw new Error('BROCKEN')}).catch(next)
})

app.get('/write', [function (req,res,next){
    fs.writeFile('.\\', 'data',next)
}, function(req,res){res.send('OK')}])

app.get('/chain',[function(req,res,next){
    fs.readFile('Rest1.js', 'utf-8', function(err,data){
        res.locals.data = data
        next(err)
    })
},
function(req,res){
    res.locals.data = res.locals.data.split(',')[0]
    res.send(res.locals.data)
}
])

//not work, maybe app.use
app.get('/header', function errorHandler(err,req,res,next) {
    if(res.headersSent){
        return next(err)
    }
    res.status(500)
    res.render('error', {error:err})

})



app.listen(port,() => console.log(`Server listening on port ${port}!`));
//app.listen(port);