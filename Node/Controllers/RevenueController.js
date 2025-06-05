const revenues = require('../Models/RevenueModel');
const User = require('../Models/UserModel')

//שליפת כל ההכנסות לפי ID של לקוח
async function getAllRevenueById(req, res) {
    try {
        debugger

        const id = req.params.id;
        const arrRevnue = await revenues.find({ userId: id });
        res.status(200).send(arrRevnue);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
async function deleteRevenue(req, res) {
    try {
      
        const id = req.params.revenueId;
        const userId=req.params.id;
        const revenue = await revenues.findByIdAndDelete(id);

        await User.findOneAndUpdate(
        { _id: userId },
        { $inc: { sumMoney: revenue.price*-1 } } );
        
        if (!revenue) {
            return res.status(404).send("Revenue not found");
        }
        res.status(200).send("Revenue deleted successfully");

    } catch (error) {
        console.error(error);
    }
    
}
async function addRevenue(req, res) {
    const { userId, price, date } = req.body;
    console.log(req.body)


    if (!userId || !price) {
        return res.status(400).json({ error: "All fields are required" });
    }
    req.body.date = date || Date.now();

    await User.findOneAndUpdate(
        { _id: userId },
        { $inc: { sumMoney: price } } // הוספת המחיר לשדה price
    );
    const newRevenue = new revenues(req.body);
    console.log(newRevenue)
    try {
        newRevenue.save()
        res.status(200).json(newRevenue);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save revenue" });
    };
}
async function getUserRevenue(userId) {
    try {
        console.log(userId);
        
        // קביעת התאריך של 24 השעות האחרונות
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        // חיפוש הכנסות שהיו ביממה האחרונה
        const revenuesList = await revenues.find({
            userId: userId,
            date: { $gte: yesterday } // הנחה שיש לך שדה תאריך בשם 'date'
        });

        // החזרת המערך של ההכנסות
        console.log("Revenues in the last 24 hours:", revenuesList);
        return revenuesList; // החזרת המערך של ההכנסות
    } catch (error) {
        console.error("Error fetching user revenue:", error);
        throw new Error("Failed to fetch user revenue");
    }
}

module.exports = { getAllRevenueById, addRevenue ,deleteRevenue,getUserRevenue}
