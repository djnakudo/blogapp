const express = require('express'),
bodyparser = require('body-parser'),
mongoose = require('mongoose'),
sanitizer = require('express-sanitizer'),
methodOverride = require('method-override');
let app = express();
app.set('view engine','ejs');
// override method post to be a put method
app.use(methodOverride("_method"));
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));
app.use(sanitizer());
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/RESTblogapp",{
    useMongoClient:true
},(err,res)=>{
    if(err)
    console.log('could not connect to MongoDB');
    else
    console.log('Database Connected');
});
const Blogs = require('./database/blogsdb');

let routes = require('./server/routes')(app);
app.listen(process.env.PORT || 3000,()=>{
    console.log('server running on port 3000');
})