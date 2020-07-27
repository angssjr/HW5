var express = require('express');
const { allowedNodeEnvironmentFlags, report } = require('process');
var app = express();

var handlebars  = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');


app.engine('handlebars', handlebars.engine);
app.set('view engine','handlebars');
app.set('port', 6140);

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.get('/', (req,res)=>{
    console.log('hello world!');
    res.render('main');
})

app.get('/show-data', (req,res)=>{
    var context = {};
    context.sentData = req.query.myData;
    res.render('show-data',context);
})

app.get('/get-loopback',(req,res)=>{
    var qParams = "";
    for(var p in req.query){
        qParams+= "The name " + p + " contains the value " + req.query[p] + ", ";
    }
    qParams = qParams.substring(0, qParams.lastIndexOf(','));
    qParams += '.';
    var context = {};
    context.dataList = qParams;
    res.render('get-loopback', context);
});

app.get('/get-loopback-improved', (req,res)=>{
    var qParams = [];
    for(var p in req.query){
        qParams.push({"name":p,"value":req.query[p]})
    }
    var context = {};
    context.dataList = qParams;
    res.render('get-loopback-improved',context);
})

app.use((req,res)=>{
    res.status(404);
    res.render('404');   
});

app.use((req,res)=>{
    res.status(500);
    res.render('500');
});

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
})

app.listen(app.get('port'),function(){
    console.log('Express started on http://flip3.engr.oregonstate.edu'+app.get('port')+'; press Ctrl-C to terminate.')
});
    