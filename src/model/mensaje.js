const mongoose = require('mongoose');

// Definir el modelo de datos para los mensajes de contacto
const Contact = mongoose.model('Contact', {
    name : {
        type: String,
        required: true        
        },
    email: {
        type: String,
        required: true
    },
    message: { 
        type: String,
        required: true
    
    }
    
});

module.exports=Contact;

