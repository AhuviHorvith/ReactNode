
const mongoose = require("mongoose");
const ExpensesModel = require("./ExpensesModel");

const UserModel = mongoose.Schema({
  password: {
    type: String,
    required: true
  },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /.+\@.+\..+/.test(v); // Basic email validation
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  sumMoney: { type: Number },
  googleId: { type: String }, // הוסף שדה לזיהוי משתמשי גוגל
  //מערך של קטגוריות
  Expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
  //מערך של הכנסות
  Incomes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Income" }],
  //שעת דיווח
  reportTime:{  type: String,
  validate: {
    validator: function(v) {
      return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v); // תבנית לשעת 24 שעות
    }}
  }
});

module.exports = mongoose.model("User", UserModel)