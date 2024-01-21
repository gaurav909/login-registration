const { default: mongoose } = require('mongoose')
const mangoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'mbs_users'
    },
    token:{
        type:String,
        required:true,
    },
    expireAt:{
        type:Date,
        required:true,
    }
})


tokenSchema.index({expireAt:1},{expireAfterSeconds:0})


module.exports = mongoose.model('mbs_token',tokenSchema)