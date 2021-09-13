// const { findByIdAndUpdate } = require("../models/tourModels");
const Tour=require("../models/tourModels");
const APIFeatures=require('../utils/apiFeatures')
const catchAsync=require('../utils/catchAsync')
const AppError=require('../utils/appError')
exports.aliasTopTours=(req,res,next)=>{
    req.query.limit='5';
    req.query.sort='-ratingsAverage,price';
    req.query.fields='name,price,ratingsAverage,summary,difficulty'
    next(); 
}

// const tours=JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));


// exports.checkId=(req,res,next,val)=>
// {
//     console.log(`Tour id is: ${val}`);
//     // if(req.params.id*1>tours.length)
//     // {
//     //     return res.status(404).json({
//     //         status:'fail',
//     //         message:'Invalid Id'
//     //     });
//     // }
//     next();
// }

// exports.checkBody =(req,res,next)=>
// {
//     if(!req.body.name|| !req.body.price)
//     {
//         return res.status(400).json({
//             status:'fail',
//             message:'Missing name or price'
//         });
//     }
//     next();
// }

// class APIFeatures{
//     constructor(query,queryString)
//     {
//         this.query=query;
//         this.queryString=queryString;
//     }

//     filter()
//     {
//         const queryObj={ ...this.queryString }; 
//         const excludedFields=['page','sort','limit','fields'];
//         excludedFields.forEach(el=> delete queryObj[el]);
//         let queryStr=JSON.stringify(queryObj);
//         queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
//         // let query=Tour.find(JSON.parse(queryStr));
       
//        this.query=this.query.find(JSON.parse(queryStr))
//        return this;
//     }

//     sort()
//     {
//         if(this.queryString.sort)
//         {
//           const sortBy= this.query.sort.split(',').join(' ');
//           this.query= this.query.sort(sortBy)  
//         //   query=query.sort(req.query.sort)  
//         }else{
//             this.query= this.query.sort('-createdAt');
//         }
//         return this;
//     }

//     limitFields()
//     {
//         if(this.queryString.fields)
//         {
//             const fields=this.queryString.fields.split(',').join(' ');
//             this.query=this.query.select(fields);
//         }else{
//             this.query=this.query.select('-__v');
//         }
//         return this;
//     }

//     paginate()
//     {
//         const page=this.queryString.page * 1 || 1;
//         const limit=this.queryString.limit*1 || 100;
//         const skip=(page-1)*limit
//         this.query=this.query.skip(skip).limit(limit)
//         // if(this.queryString.page)
//         // {
//         //     const numTours=Tour.countDocuments();
//         //     if(skip>=numTours){
//         //         throw new Error('This Page doesnot exist');
//         //     }
//         // }
//         return this;
//     }

// }

exports.getAllTours=catchAsync(async (req,res,next)=>{
    // console.log(req.requestTime);

    const features=new  APIFeatures(Tour.find(),req.query).filter()
                                                             .sort()
                                                             .limitFields()
                                                             .paginate();
                                                             

        const tours=await features.query
        res.status(200).json({ 
            status:'success',
            // requested:req.requestTime,
            result:tours.length,
            data:{
                tours:tours 
            }
        })



    // try{
        // const queryObj={ ...req.query }; 
        // const excludedFields=['page','sort','limit','fields'];
        // excludedFields.forEach(el=> delete queryObj[el]);
        // // console.log(req.query,queryObj);



        // let queryStr=JSON.stringify(queryObj);
        // // console.log(queryStr)
        // queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
        // // console.log(JSON.parse(queryStr));
        // let query=Tour.find(JSON.parse(queryStr));
        // const query=Tour.find(queryObj);
        // const tours=await Tour.find(queryObj);
        // const tours=await Tour.find(req.query);
        // const query=Tour.find().where('duration').
        //                              equals(5).
        //                              where('difficulty').
        //                              equals('easy')
        // // const tours=await Tour.find();
        // const tours=await Tour.find().where('duration').
        //                              equals(5).
        //                              where('difficulty').
        //                              equals('easy')
        // // const tours=await Tour.find();

        // if(req.query.sort)
        // {
        //   const sortBy=req.query.sort.split(',').join(' ');
        //   query=query.sort(sortBy)  
        // //   query=query.sort(req.query.sort)  
        // }else{
        //     query=query.sort('-createdAt');
        // }


        // if(req.query.fields)
        // {
        //     const fields=req.query.fields.split(',').join(' ');
        //     query=query.select(fields);
        // }else{
        //     query=query.select('-__v');
        // }

        // const page=req.query.page*1;
        // const limit=req.query.limit*1 || 100;
        // const skip=(page-1)*limit
        // query=query.skip(skip).limit(limit)

        // if(req.query.page)
        // {
        //     const numTours=await Tour.countDocuments();
        //     if(skip>=numTours){
        //         throw new Error('This Page doesnot exist');
        //     }
        // }


        
        // const features=new APIFeatures(Tour.find(),req.query).filter()
        //                                                      .sort()
        //                                                      .limitFields()
        //                                                      .paginate();
                                                             

        // const tours=await features.query
        // // const tours=await query


        // res.status(200).json({ 
        //     status:'success',
            // requested:req.requestTime,
    //         result:tours.length,
    //         data:{
    //             tours:tours 
    //         }
    //     })
    // }catch(err)
    // {
    //     res.status(404).json({
    //         status:'fail',
    //         message:err
    //     })
    // }
    
});


exports.getTour=catchAsync(async (req,res,next)=>{
    // console.log(req.params);
    // const id=req.params.id *1;
    // const tour=tours.find(el=>{
    //     return el.id==id
    // })

    const tour= await Tour.findById(req.params.id)

    if(!tour)
    {
       return next(new AppError("No tour found with that ID",404));
    }

    res.status(200).json(
    {
        status:'success',
        data:{
            tour:tour
        }
    });




    // try{
    //       const tour= await Tour.findById(req.params.id)
    //       res.status(200).json({
    //         status:'success',
    //         data:{
    //             tour:tour
    //         }
    //     });
    // }catch(err) 
    // { 
    //     res.status(404).json({
    //         status:'fail',
    //         message:err
    //     })

    // }

    // // if(id>tours.length)
    // if(!tour)
    // {
    //     return res.status(404).json({
    //         status:"fail",
    //         message:"Invalid id"
    //     })
    // }

    // res.status(200).json({
    //     status:'success',
    //     // data:{
    //     //     tours:tour
    //     // }
    // });
});

// const catchAsync=fn=>
// {
//     return (req,res,next)=>
//     {
//         fn(req,res,next).catch(next);
//     };
// }

exports.createTour= catchAsync(async (req,res,next)=>{

    const newTour=await Tour.create(req.body);
        res.status(201).json({
            status:'success',
            data:{
                tour:newTour
             }
        }) 

    // try{
    //     const newTour=await Tour.create(req.body);
    //     res.status(201).json({
    //         status:'success',
    //         data:{
    //             tour:newTour
    //          }
    //     }) 

    // }catch(err)
    // {
    //     res.status(400).json({
    //         status:'fail',
    //         message:err
    //         // message:'Invalid data sent'
    //     })
    // }
})





// exports.createTour= async (req,res)=>{
//     try{
//         const newTour=await Tour.create(req.body);
//         res.status(201).json({
//             status:'success',
//             data:{
//                 tour:newTour
//              }
//         }) 

//     }catch(err)
//     {
//         res.status(400).json({
//             status:'fail',
//             message:err
//             // message:'Invalid data sent'
//         })
//     }
    
    // const newID=tours[tours.length-1].id+1;
    // const newTour=Object.assign({id:newID},req.body)
    // tours.push(newTour);
    // fs.writeFile(
    //     `${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
    //     res.status(201).json({
    //         status:'success',
    //         data:{
    //             tour:newTour
    //         }
    //     })
        
    // })
// };

exports.updateTour=catchAsync(async (req,res,next)=>
{
    const tour= await Tour.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
      })

      if(!tour)
      {
         return next(new AppError("No tour found with that ID",404));
      }
  
      res.status(200).json({
          status:'success',
          data:{
              // tour:'<updated tour here...>'
              tour:tour
          }
      })



    // try{
    //   const tour= await Tour.findByIdAndUpdate(req.params.id,req.body,{
    //       new:true,
    //       runValidators:true
    //     })
    //     res.status(200).json({
    //         status:'success',
    //         data:{
    //             // tour:'<updated tour here...>'
    //             tour:tour
    //         }
    //     })

    // }catch(err)
    // {
    //     res.status(400).json({
    //         status:'fail',
    //         // message:err
    //         message:'Invalid data sent'
    //     })
    // }  
    // const id=req.params.id *1;
    // const tour=tours.find(el=>{
    //     return el.id==id
    // })

    // if(!tour) 
    // {
    //     return res.status(404).json({
    //         status:'fail',
    //         message:'Invalid Id'
    //     })
    // }

    // res.status(200).json({
    //     status:'success',
    //     data:{
    //         tour:'<updated tour here...>'
    //     }
    // })
});

exports.deleteTour=catchAsync(async (req,res,next)=>
{
    // const id=req.params.id *1;
    // const tour=tours.find(el=>{
    //     return el.id==id
    // })

    // if(!tour)
    // {
    //     return res.status(404).json({
    //         status:'fail',
    //         message:'Invalid Id'
    //     })
    // }

    const tour= await Tour.findByIdAndDelete(req.params.id);

    if(!tour)
    {
       return next(new AppError("No tour found with that ID",404));
    }

        res.status(204).json({
            status:'success',
            data: null
        })
    
    // try{
    //     await Tour.findByIdAndDelete(req.params.id);
    //     res.status(204).json({
    //         status:'success',
    //         data: null
    //     })
    // }
    // catch(err)
    // {
    //     res.status(404).json({
    //                 status:'fail',
    //                 message:err
    //             })

    // }

    // res.status(204).json({
    //     status:'success',
    //     data: null
    // })
})


exports.getTourStats=catchAsync(async(req,res,next)=>{

    const stats=await Tour.aggregate([
        {
            $match:{ ratingsAverage:{$gte:4.5}}
        },
        {
            $group:{
                // _id:null,
                // _id:'$difficulty',
                // _id:'$ratingsAverage',
                _id:{$toUpper:'$difficulty'},
                numTours:{$sum:1},
                numRatings:{$sum:'$ratingsQuantity'},
                avgRating:{$avg:'$ratingsAverage'},
                avgPrice:{$avg:'$price'},
                minPrice:{$min:'$price'},
                maxPrice:{$max:'$price'},
            }
        },
        {
            $sort:{ avgPrice:1}
        }
    ])
    res.status(200).json({
        status:'success',
        data:{
            stats
        }
    });




    // try{
    //     const stats=await Tour.aggregate([
    //         {
    //             $match:{ ratingsAverage:{$gte:4.5}}
    //         },
    //         {
    //             $group:{
    //                 // _id:null,
    //                 // _id:'$difficulty',
    //                 // _id:'$ratingsAverage',
    //                 _id:{$toUpper:'$difficulty'},
    //                 numTours:{$sum:1},
    //                 numRatings:{$sum:'$ratingsQuantity'},
    //                 avgRating:{$avg:'$ratingsAverage'},
    //                 avgPrice:{$avg:'$price'},
    //                 minPrice:{$min:'$price'},
    //                 maxPrice:{$max:'$price'},
    //             }
    //         },
    //         {
    //             $sort:{ avgPrice:1}
    //         }
    //         // {
    //         //     $match:{
    //         //          _id:{$ne:'EASY'}
    //         //     }
    //         // }
    //     ])
    //     res.status(200).json({
    //         status:'success',
    //         data:{
    //             stats
    //         }
    //     });
    // }catch(err)
    // {
    //     res.status(404).json({
    //         status:'fail', 
    //         message:err
    //     })
    // }
})

exports.getMonthlyPlan=catchAsync(async(req,res,next)=>{

    const year=req.params.year*1;
        const plan=await Tour.aggregate([
            {
                $unwind:'$startDates'
            },
            {
                $match:{
                    startDates:{
                        $gte:new Date(`${year}-01-01`),
                        $lte:new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group:{
                    _id:{$month:'$startDates'},
                    numTourStarts:{$sum:1},
                    tours:{$push:'$name'}
                }
            },
            {
                $addFields:{
                    month:'$_id'
                }
            },
            {
                $project:{
                    _id:0
                }
            },
            {
                $sort:{
                    numTourStarts:-1 
                }
            },
            {
                $limit:12
            }
        ]);
        res.status(200).json({
            status:'success',
            data:{
                plan
            }
        });


    // try
    // {
        // const year=req.params.year*1;
        // const plan=await Tour.aggregate([
        //     {
        //         $unwind:'$startDates'
        //     },
        //     {
        //         $match:{
        //             startDates:{
        //                 $gte:new Date(`${year}-01-01`),
        //                 $lte:new Date(`${year}-12-31`)
        //             }
        //         }
        //     },
        //     {
        //         $group:{
        //             _id:{$month:'$startDates'},
        //             numTourStarts:{$sum:1},
        //             tours:{$push:'$name'}
        //         }
        //     },
        //     {
        //         $addFields:{
        //             month:'$_id'
        //         }
        //     },
        //     {
        //         $project:{
        //             _id:0
        //         }
        //     },
        //     {
        //         $sort:{
        //             numTourStarts:-1 
        //         }
        //     },
        //     {
        //         $limit:12
        //     }
        // ]);
        // res.status(200).json({
        //     status:'success',
        //     data:{
        //         plan
        //     }
        // });

    // }catch(err)
    // {
    //     res.status(404).json({
    //         status:'fail', 
    //         message:err
    //     })
    // }
})