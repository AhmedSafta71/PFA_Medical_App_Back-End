const mongoose = require('mongoose');
const validator = require('validator');


const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Entrer votre nom'],
        maxlength: [20, 'Le nom ne peut pas depasser 20 caractères']
    },
    surname: {
        type: String,
        required: [true, 'Please enter your prénom'],
        maxlength: [20, 'Le Prénom ne peut pas depasser 20 caractères']
    },
    height: {
        type: String,
        required: [true, 'Entrez votre taille '],
    },
    weight: {
        type: String,
        required: [true, 'Entrez le poids '],
    },

    gender: {
        type: String,
        required: [true, 'champ obligatoire'],
    },
    age: {
        type: String,
        required: [true, 'champ obligatoire'],
    },
    disease: {
        type: [String], 
    },
    operation:{
        type: [String],
    },
    smoker: {
        type: String,
        required: [true, 'champ obligatoire'],
    },
    email: {
        type: String,
        required: [true, 'Entrez votre email'],
        validate: [validator.isEmail, 'Enterz une addresse email valide '],
        unique: true,
    },
 
    createdAt: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model('Patient', patientSchema);