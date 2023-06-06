const  Question = require('../models/Question');
const ErrorHandler = require('../utils/errorHandler');
const catchAssyncErrors = require('../middlewares/catchAssyncErrors');
const APIFeatures = require('../utils/apiFeatures'); 

//create  a new question  =>/me/question/new
exports.newQuestion = catchAssyncErrors(async (req, res) => {
  
    let {
        poster_id,
        poster_role,
        poster_name,
        poster_city,
        title,
        description
    } = req.body;

    const question = await Question.create({
        poster_id,
        poster_role,
        poster_name, 
        poster_city,
        title,
        description
    }).catch(err => {
        console.log(err);
        res.status(400).json({
            success: false,
            message: 'Question already created'
        });
    })
    res.status(201).json({
        success: true,
        question
    })

})
// get all questions => /me/allQuestions
exports.getAllQuestions = catchAssyncErrors(async (req, res, next) => {
    //total number of doctors 
    let  questionsCount=0; 
    questionsCount = await Question.countDocuments();
    // console.log("DoctorsCount",doctorsCount);
    
    //how many Doctors cards to display per page 
    const resPerPage = 6;
    const apiFeatures = new APIFeatures(Question.find(), req.query)
        // .search()
        // .filter();
    
      
    let questions= await apiFeatures.query;
    console.log("hello , hello");
    let filteredQuestionsCount = questions.length;

   apiFeatures.pagination(resPerPage);
   console.log("PQuestionQuerry",questionsCount);
   
   questions = await apiFeatures.query.clone();
 
        res.status(200).json({
            success: true,
          // result: `${filteredDoctorsCount} out of ${doctorsCount} doctors found`,
            resPerPage,
            questions, 
            questionsCount,
            filteredQuestionsCount, 
        })
        return next(new ErrorHandler('error', 400)); 
})
// get Question by Id:  => /me/question/details/:id

exports.getQuestionById = catchAssyncErrors(async (req, res, next) => {
    console.log("params ", req.params.id); 
   const question = await Question.findById(req.params.id); 
   if (!question) {
       return next(new ErrorHandler('Product not found', 404));
   }
   res.status(200).json({
       succcess: true,
       question: question
   })
   
})




//register response for a  question 
exports.registerResponse= catchAssyncErrors(async (req, res, next) => {
    
     let responses=[];
     let count=0;
     let question = await Question.findById(req.body.id); 
    if (!question) {
        return next(new ErrorHandler('Question not found', 404))
    }
    else {
        responses= question.responses;
        responses.push(req.body.response);
        count= responses.length;
     }


    question = await Question.updateOne({_id:req.body.id}, {responses:responses,responseCount:count},{
        new: true,
        runValidators: false,
        useFindAndModify: true
    });
   

    res.status(200).json({
        success: true,
        question:question,
        responses:responses,
        
    })

})




// update a question  =>  me/question/update 
 
exports.updateQuestion = catchAssyncErrors(async (req, res, next) => {
    
    let question = await Question.findById(req.body.id); 
   if (!question) {
       return next(new ErrorHandler('Question not found', 404))
   }
  
   question = await Question.updateOne({_id:req.body.id}, {description:req.body.content},{
       new: true,
       runValidators: false,
       useFindAndModify: true
   });
   console.log("the question beeing sent is ",question)

   res.status(200).json({
       success: true,
       question:question,
      
       
   })

})

// delete a question  =>  me/question/delete