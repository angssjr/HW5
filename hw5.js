var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

var bodyParser = require('body-parser');


app.engine('handlebars', exphbs());
app.set('view engine','handlebars');
app.set('port', 6140);

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.get('/', (req,res)=>{
    console.log('GET! hello world!');
    var qParams = [];
    for(var p in req.query){
        qParams.push({"name":p,"value":req.query[p]})
    }
    var context = {};
    context.dataList = qParams;
    res.render('get',context);
})

app.post('/', function(req,res){
    var qParams = [];
    for (var p in req.body){
      qParams.push({"name":p,"value":req.body[p]})
    }
    console.log(qParams);
    console.log(req.body);
    var context = {};
    context.dataList = qParams;
    res.render('post', context);
  });


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
    