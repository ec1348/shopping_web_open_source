let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let config = require('config')
let memberRouter = require('./routes/member_router');
let productRouter = require('./routes/product_router')
let orderRouter = require('./routes/order_router')
let cors = require('cors')

let app = express();
if(config.util.getEnv('NODE_ENV')!=='test'){
  app.use(logger('dev'));

}
//cors setup
const corsOptions={
  origin:['http://localhost:8080',['https://10.0.2.15:8080']],
  methods:['GET','POST']
} 

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', 'POST, GET')
  next()
})
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../web-front/dist')));
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', ( req, res ) => {
  res.sendFile(path.join(__dirname, '../web-front/dist/index.html'))
})
app.use('/api/member', memberRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3000, ()=>console.log("Server running at http://localhost:3000"))
module.exports = app;
