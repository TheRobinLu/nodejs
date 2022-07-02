const express = require('express');

const app = express();
const port = 8083;

app.get('/a/', (req: any,res: any) => res.send('Hello World'));
app.get('/ab?cd/', (req: any,res: any) => res.send('whatever b is there or not'));
app.get('/ab+cd/', (req: any,res: any) => res.send('However many bs'));
app.get('/pkg/', (req: any,res: any) => {
    console.log('dsjakdsa');
    res.sendFile('C:/Projects/Express-Demo/package.json')
});

app.get('/ab(cd)?e', (req: any,res: any) => {
    res.send("display for abe or abcde");

});

app.get('/ab*e', (req: any,res: any) => {
    res.send("display for ab anyword e ");

});

app.get('users/:userid/books/:bookid', function(req: any,res: any) {res.send(req.params);})

app.listen(port,() => console.log(`Server listening on port ${port}!`));

