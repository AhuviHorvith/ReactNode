const Expense = require('../Models/ExpensesModel');
const User = require('../Models/UserModel')

// //הוספת הוצאה
async function addExpenses(req, res) {
    try {
        const { userId, category, notes, price, date } = req.body;
        let newExpenses = new Expense({ userId: userId, date: date, price: price, notes: notes, category: category });
        // שמירת ההוצאה החדשה
        await newExpenses.save();

        // עדכון המשתמש בהוצאה החדשה בהוצאה
        await User.findOneAndUpdate(
            { _id: userId },
            { $inc: { sumMoney: price*-1 } } // הוספת המחיר לשדה price
        );
        res.send({ message: "created successful", Expense: newExpenses });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
//שליפ תמערך הוצאות
async function pullExpenses(req, res) {
    try {
        let id = req.params.id;
        const expenses = await Expense.find({ userId: id }).populate('category'); 
        res.status(200).send({ message: "Push successful", expenses });
    } catch (error) {
        console.error("שגיאה בלקיחת הוצאות:", error);
        res.status(500).send({ message: "שגיאה בלקיחת הוצאות", error: error.message });
    }
}
// מחיקת הוצאה
async function deleteExpense(req, res) {
    try {
        const expenseId = req.params.expenseId;
        const userId=req.params.id
        // מצא את ההוצאה כדי לדעת את סכום ההוצאה
        const expense = await Expense.findById(expenseId);
        await User.findOneAndUpdate(
            { _id: userId },
            { $inc: { sumMoney: expense.price } } // הוספת המחיר לשדה price
        );
        if (!expense) { 
            return res.status(404).send({ message: "Expense not found" });
        }
        
        // מחיקת ההוצאה
        await Expense.findByIdAndDelete(expenseId);
        res.status(200).send({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error("Error deleting expense:", error);
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
}
// שליפת הוצאות לפי userId
async function getUserExpenses(userId) {
    try {
        // קביעת התאריך של 24 השעות האחרונות
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        // שליפת ההוצאות שהיו ביממה האחרונה לפי userId עם מידע על הקטגוריה
        const expensesList = await Expense.find({
            userId: userId,
            date: { $gte: yesterday } // הנחה שיש לך שדה תאריך בשם 'date'
        }).populate('category'); // כאן מתבצעת ההשלמה של הקטגוריה

        // החזרת המערך של ההוצאות
        return expensesList; // החזרת המערך של ההוצאות
    } catch (error) {
        console.error("Error fetching user expenses:", error);
        throw new Error("Failed to fetch user expenses");
    }
}


module.exports = { addExpenses, pullExpenses,deleteExpense,getUserExpenses }



