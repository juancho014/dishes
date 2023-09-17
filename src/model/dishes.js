const mongoose = require('mongoose');

const Dish = mongoose.model('Dish', {
    name : {
        type: String,
        required: true        
        },
    description: {
        type: String,
        required: true
    },
    img: { 
        type: String,
        required: true
    }
});

module.exports = Dish;