const ErrorHandler= require("../utils/errorHandler");
const validation= (schema)=> async(req,res,next)=>{
    try {
        await schema.validate(req.body); 
    }
    catch (error){
        next (new ErrorHandler(error,401)); 
    }
}
module.exports=validation ;