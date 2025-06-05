
const jwt = require("jsonwebtoken")
const User = require("../Models/UserModel")
//jwt  יש 2 פונקציות מרכזיות שבהם נשתמש
//קוקיז לא עבד
function createToken(req, res) {
    console.log("create token")
    let user = req.body; // גישה לנתוני המשתמש ששמרנו ב-addUser
    try {
        let token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.SECRET);
        console.log(token);
        res.status(200).json({ user: user, token: token, message: 'Token created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding Token', error: error.message });
    }
} function createToken1(user) {
    // אפשר גם user._id במקום user.id
    return jwt.sign(
        { id: user.id || user._id, name: user.name, email: user.email },
        process.env.SECRET,
        { expiresIn: '7d' }
    );
}
async function verifyToken(req, res, next) {

    try {
console.log(req.params)

        const user1 = await User.findOne({ _id: req.params.id });
        const token = req.headers.authorization?.split(' ')[1]; // שליפת הטוקן מכותרת Authorization

        if (!token) return res.status(401).send("No token provided");
        const user = jwt.verify(token, process.env.SECRET); // אימות הטוקן
 console.log(user)

        // השוואת ה-id בטוקן עם ה-id שנשלח בבקשה
        if (user.email.trim() !== user1.email.trim()) {
            console.log(user.email.trim() + email.trim)
            console.log("the mail is not same")
            return res.status(403).send("Access denied. User mismatch.");
        }
console.log("verifyToken"+req.email+req.name)
        req.email = user.email;
        req.name = user.name
        // שמירת פרטי המשתמש בבקשה
        next();
    } catch (err) {
        res.status(400).send("Invalid token");
    }
}
async function getUserByToken(req, res) {

    const token = req.headers.authorization?.split(' ')[1]; // שליפת הטוקן מכותרת Authorization

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET); // אימות הטוקן
        console.log(decoded.email)
        const user = await User.findOne({ email: decoded.email }); // שליפת המשתמש ממסד הנתונים לפי ה-id בטוקן
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user: user }); // החזרת פרטי המשתמש
    } catch (error) {
        res.status(400).json({ message: 'Invalid token', error: error.message });
    }
}

module.exports = {createToken1, createToken, verifyToken, getUserByToken }
