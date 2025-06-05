const express = require("express")
const router = express.Router()

const{addExpenses,pullExpenses,deleteExpense}=require("../Controllers/ExpensesController")
const { verifyToken } = require("../Middleware/auth")

router.post("/addExpenses/:id",addExpenses)
router.delete("/deleteExpense/:id/:expenseId", deleteExpense);
router.get("/pullExpenses/:id",verifyToken,pullExpenses)
module.exports= router
  
