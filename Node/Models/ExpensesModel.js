const { text } = require("express");
const mongoose = require("mongoose")

const ExpenseModel = mongoose.Schema({
    userId:{type:String,required: true},
    date:{type:Date},
    price: { type: Number },
    notes:{type:String},
    category:{ type: mongoose.Schema.Types.ObjectId, ref:"CollectionCategories"}
  });
  

module.exports = mongoose.model("Expense",ExpenseModel)
