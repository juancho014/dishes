const mongoose = require('mongoose');

// Definir el modelo de datos para los mensajes de contacto
const Registro = mongoose.model('Registro', {
    name : {
        type: String,
        required: true        
        },
 
    password: { 
        type: String,
        required: true
    
    }
    
});

module.exports=Registro;