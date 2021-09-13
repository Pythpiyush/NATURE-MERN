const express = require('express');

const app = express();

const morgan=require('morgan');

const AppError=require('./utils/appError')
const globalErrorHandler=require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`))


// app.use((req,res,next)=>{
//     console.log("Hello from the Middleware!!");
//     next(); 
// })

app.use((req,res,next)=>{
  req.requestTime = new Date().toISOString();
  next();
});


// app.get('/api/v1/tours',getAllTours)
// app.get('/api/v1/tours/:id',getTour)
// app.post('/api/v1/tours',createTour)
// app.patch('/api/v1/tours/:id',updateTour)
// app.delete('/api/v1/tours/:id',deleteTour)
  

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


app.all('*',(req,res,next)=>{
  // res.status(404).json({
  //   status:'fail',
  //   message:`Can't find ${req.originalUrl} on the server`
  // })
  // const err=new Error( `Can't find ${req.originalUrl} on the server`);
  // err.status='fail'
  // err.statusCode=404;
  // next(err);

  next(new AppError(`Can't find ${req.originalUrl} on the server`,404));
})

app.use(globalErrorHandler)
// app.use((err,req,res,next)=>{
//   console.log(err.stack);
//   err.statusCode=err.statusCode || 500;
//   err.status=err.status || 'error';
//   res.status(err.statusCode).json({
//     status:err.status,
//     message:err.message

//   })
// })


module.exports = app;
