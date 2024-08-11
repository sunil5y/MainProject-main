const mongoose=require('mongoose');
const {Schema}=mongoose;    

const paymentSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    number:{
        type:String,
        required:true
    },
    expiration:{
        type:String,
        required:true
    },
    cvv:{
        type:String,
        required:true
    },
});

const Payment=mongoose.model('Payment', paymentSchema);
module.exports=Payment;