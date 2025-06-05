const mongoose = require("mongoose");


const CollectionCategoriesModel = mongoose.Schema({
    name: {type:String,required: true},
    color:{type:String},
    icon:{type:String}
  });
  

module.exports = mongoose.model("CollectionCategories",CollectionCategoriesModel)
