const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const mongoose=require('mongoose');

process.on('uncaughtException',err=>{
  console.log('UNCAUGHT EXCEPTION: Shutting Down...')
  console.log(err.name,err.message);
  // server.close(()=>{
  //   process.exit(1);
  // })
  process.exit(1);
});




const app = require('./app');


// console.log(process.env.NODE_ENV)


// const port=3000;
const DB=process.env.DATABASE.replace('<PASSWORD>',
         process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true
    }).
    then(()=>console.log('SUCCESSFUL'))
    // .catch(err=>console.log('Error'));

    // then(con=>
    // {
    // console.log(con.connections);
    // console.log('DB CONNECTIONS SUCCESSFUL');
    // })





 
// const testTour=new Tour({
//   name:'The Park Camper',
//   price:997
// });

// testTour.save().then(doc=>{
//   console.log(doc);
// }).catch(err=>{
//   console.log(err);
// })
 
const port = process.env.PORT || 3000;

const server=app.listen(port, () => {
  console.log(`App running on the port ${port}`);
});


process.on('unhandledRejection',err=>{
  console.log(err.name,err.message);
  console.log('Unwanted Rejection: Shutting Down...')
  server.close(()=>{
    process.exit(1);
  })
  // process.exit(1);
});



