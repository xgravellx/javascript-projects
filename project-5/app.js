const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const blogRouter = require('./src/routers/blog_routers');

app.use(express.static('public')); // public altındaki klasör yollarından bağımsız olmasını sağlar.
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));

app.use(express.urlencoded({extended:true})); // search ,le ilgili

app.use('/', blogRouter);
app.use('/blog', blogRouter);

app.listen(3000, () => {
    console.log("3000 portundan ayaklandı");
})