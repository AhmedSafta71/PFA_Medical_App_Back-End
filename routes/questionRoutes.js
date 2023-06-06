const express = require('express') ; 
const router = express.Router();
const {newQuestion,getAllQuestions,registerResponse,getQuestionById,updateQuestion  } =require('../controllers/questionController'); 

router.route('/me/question/new').post(newQuestion); 
router.route('/me/allQuestions').get(getAllQuestions); 
router.route('/me/question/details/:id').get(getQuestionById); 
router.route('/me/doctor/question/newResponse').put(registerResponse);
router.route('/me/patient/question/update').put(updateQuestion);


module.exports = router;