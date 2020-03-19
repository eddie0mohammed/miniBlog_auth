

const mongoose = require('mongoose');



const articleSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Title is required']
    },

    author: {
        type: String,
        required: [true, 'Author is required']
    },

    details: {
        type: String,
        required: [true, 'Article is required']
    },

    date: {
        type: Date,
        default: Date.now
    }

});



module.exports = mongoose.model('Article', articleSchema);