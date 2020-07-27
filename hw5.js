var express = require('express');
const { allowedNodeEnvironmentFlags, report } = require('process');
var app = express();

var handlebars  = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', 'handlebars');
app.set('view engine',handlebars);
app.set('port', 6140);

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.get('/', (req,res)=>{
    console.log('hello world!');
    res.render('main');
})


app.use((req,res)=>{
    res.status(404);
    res.render('404');   
});

app.use((req,res)=>{
    res.status(500);
    res.render('500');
});

