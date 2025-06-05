const mongoose = require("mongoose")

const RevenueNodel = mongoose.Schema({
    userId:{type:String,require:true},
    date:{type:Date},
    price: { type: Number },
    revenueId:{type:Number},
    category:{type:String},
    notes:{type:String}
})

module.exports= mongoose.model( "Revenue",RevenueNodel)
