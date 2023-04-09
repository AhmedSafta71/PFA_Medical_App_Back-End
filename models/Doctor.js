const mongoose = require('mongoose');
const validator = require('validator');


const doctorSchema = new mongoose.Schema({
    Id_Doctor: {
        type: String,
        required: [true, 'Enter doctor ID'],
    }, 
    name: {
        type: String,
        required: [true, 'Entrer votre nom'],
        maxlength: [20, 'Le nom ne peut pas depasser 20 caractères']
    },
    surname: {
        type: String,
        required: [true, 'Entrer votre Prénom'],
        maxlength: [20, 'Le Prénom ne peut pas depasser 20 caractères']
    },
    city : {
        type: String,
        required: [true, 'Entrer  la ville'],
    },
    address:{
        type: String,
        required: [true, 'Entrez votre adresse'],
    },
    phone:{
        type: Number,
        required: [true, 'Entrez le numéro sur lequel vous êtes joignable'],
        valiadte: [validator.Number, 'Entrez une forme numerique exacte'],
    },
    
    speciality:{
        type: String,
        required: [true, 'champ obligatoire'],
    }, 
    description:{
        type: [String], 
        required: [true, 'champ obligatoire'],
    }, 
    soins:{
        type: [String], 
       
    }, 

    email: {
        type: String,
        required: [true, 'Entrez votre email'],
        validate: [validator.isEmail, 'Enterz une adresse email valide '],
        unique: true,
    },
   
   
    image :[{
        public_id:{
            type: String,
            required:[true, "Eneter public id"]
        }, 
        url: {
            type: String,
            required:[true, "Entrer url"],
            default: '../assets/default.jpg'
         }
    }], 
    ratings:{
        type: Number,
        defualt:0
    } , 
    numOfReviews: {
        type: Number,
        default:0
    },
    reviews: {
        type: [String],
        default :[]
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Doctor', doctorSchema);