const mongoose=require('mongoose');
const {Schema}=mongoose;    

const bookSchema=new Schema({
    bookimage:{
        type:String,
        required:false,
    },
    title:{
        type:String,
        required:true,
        unique: true,
    },
    author:{
        type:String,
        required:true
    },
    Publisher:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },


});

const Book=mongoose.model('Book',bookSchema);
module.exports=Book;