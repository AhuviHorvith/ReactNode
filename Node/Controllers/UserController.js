const cron = require('node-cron');

const User = require("../Models/UserModel");
const nodemailer = require('nodemailer');
const passport = require('passport');
const { createToken1 } = require("../Middleware/auth");
const {getUserExpenses}=require('./ExpensesController')
const{getUserRevenue}=require('./RevenueController')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // החלף בשרת SMTP שלך
    port: 587, // או 465 עבור SSL
    secure: false,
    auth: {
        user: 'financialman123456789@gmail.com',
        pass:  process.env.PASSWORD_MAIL,
    }
});

async function sendWelcomeEmail(user) {
 
    let mailOptions = {
        from: '"Financial-for-you" <financialman123456789@gmail.com>', // שולח
        to: user.email, // נמען
        subject: 'Hello from financial', // נושא
         text: `Hello ${user.name},\n\nWelcome to our new financial system! We're excited to have you on board. Feel free to explore and make the most of our services.\n\nBest regards,\nYour Team`, // טקסט פשוט
        html: `<b>Hello ${user.name},</b><br><br>Welcome to our new financial system! We're excited to have you on board. Feel free to explore and make the most of our services.<br><br>Best regards,<br>Your Team` // HTML
    
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Message sent to: %s', email);
    } catch (error) {
        console.log('Error occurred: ' + error.message);
    }
}
// הוספת משתמש
async function addUser(req, res, next) {
    const bcrypt = require('bcrypt');
    try {
        const { password, name, email, sumMoney, username } = req.body;
        // Confirm data
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // בדיקה אם המשתמש קיים
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: 'משתמש קיים כבר.' });
        }
        const hashedPwd = await bcrypt.hash(password, 10);
        const userObject = { name, email, username, sumMoney, password: hashedPwd };
        // שמירת המשתמש במסד הנתונים
        let newUser = new User(userObject);
        try {
            await newUser.save();
        } catch (error) {
            return res.status(500).json({ message: 'שגיאה בשמירת המשתמש במסד הנתונים', error: error.message });
        }
        // שליחת המייל
        try {
            await sendWelcomeEmail({ email: email, name: name });
        } catch (error) {
            return res.status(500).json({ message: 'שגיאה בשליחת המייל', error: error.message });
        }
         
        // אם הכל הצליח, קרא ל-next()
        req.body = { id: newUser._id, email: email, name: name };
        return next();
    } catch (error) {
        // טיפול בשגיאות כלליות
        res.status(500).json({ message: 'שגיאה כללית', error: error.message });
    }
}
async function IfUserExists(req, res,next) {
    const bcrypt = require('bcrypt');
    const { email, password } = req.body; // הנחה שהמייל והסיסמא נשלחים בגוף הבקשה
console.log(email+", "+password)
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // חיפוש המשתמש לפי כתובת המייל
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'משתמש לא נמצא.' });
        }
        const match = await bcrypt.compare(password, user.password); // השוואת הסיסמה
        if (!match) {
            return res.status(401).json({ message: 'סיסמא שגויה.' });
        } 
        else {
            console.log("השוואת הסיסמה")
            console.log(user)
            req.body.json = { id: user._id, email: user.email, name: user.name };
            return next() 
        }
        
    } catch (error) {
        console.error('שגיאה במהלך החיפוש:', error);
        return res.status(500).json({ message: 'שגיאה בשרת.' });
    }
}
//הוספה של שעת דיווח לשליחת דיווח למייל
async function addReportTime(req, res) {
    
    try {
        const userId = req.params.id; // שליפת userId מהפרמטרים של הבקשה
        const { reportTime } = req.body; // הנחה שה- reportTime נשלח בגוף הבקשה
        // בדיקת קלט
        if (!userId || !reportTime) {
            return res.status(400).json({ message: 'User ID and report time are required' });
        }
        // עדכון המשתמש עם reportTime
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { reportTime: reportTime },
            { new: true } // מחזיר את המסמך המעודכן
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Report time added successfully', user: updatedUser });
    } catch (error) {
        console.error('Error adding report time:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}
// פונקציה לשליחת דוא"ל יומי לכל המשתמשים
async function sendDailyReports() {
    console.log("sendDailyReports===============")
    try {
        const users = await User.find(); // שליפת כל המשתמשים
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
        for (const user of users) {
            if (user.reportTime) {
                const [reportHour, reportMinute] = user.reportTime.split(':').map(Number);
                // בדוק אם השעה הנוכחית תואמת לשעת הדיווח של המשתמש
                if (currentHour === reportHour && currentMinute === reportMinute) {
                    // חישוב תאריכים של השבוע האחרון
                    const now = new Date();
                    const weekAgo = new Date();
                    weekAgo.setDate(now.getDate() - 7);

                    // שלוף הכנסות והוצאות של השבוע האחרון
                    const Revenue = await getUserRevenue(user._id, weekAgo, now);
                    const expenses = await getUserExpenses(user._id, weekAgo, now);

                    // בדוק אם יש פירוט
                    if ((!Revenue || Revenue.length === 0) && (!expenses || expenses.length === 0)) {
                        await sendNoReportEmail(user.email);
                    } else {
                        await sendEmailWithReport(user.email, Revenue, expenses);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error sending daily reports:', error);
    }
}
// תזמון המשימה לשליחה כל יום
cron.schedule('* * * * *', sendDailyReports); // כל דקה
async function sendEmailWithReport(email, income, expenses) {
    console.log("send mail..........")
    console.log("שליחת מייל..........");
    // הנחה שהכנסות והוצאות הם מערכים של אובייקטים עם פרטי תיאור וכמות
    let incomeList = income.map(item => `<li style="text-align: right;">${item.category}: ${item.price} ש"ח</li>`).join('');
    let expensesList = expenses.map(item => `<li style="text-align: right;">${item.category.name}: ${item.price} ש"ח</li>`).join('');
    // חישוב סך ההכנסות וההוצאות
    const totalIncome = income.reduce((total, item) => total + item.price, 0);
    const totalExpenses = expenses.reduce((total, item) => total + item.price, 0);
    const remainingAmount = totalIncome - totalExpenses;
    let mailOptions = {
        from: '"Financial-for-you" <financialman123456789@gmail.com>',
        to: email,
        subject: 'דו"ח כספי יומי',
        html: `
            <div style="direction: rtl; font-family: Arial, sans-serif; background: #f8f9fa; padding: 24px;">
                <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 12px; border: 1px solid #e0e0e0; box-shadow: 0 2px 8px #eee; padding: 32px;">
                    <h2 style="color: #1976d2; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; margin-bottom: 24px;">דו"ח כספי יומי</h2>
                    <h3 style="color: #388e3c; margin-bottom: 8px;">הכנסות</h3>
                    <ul style="padding-right: 20px; margin-top: 0; margin-bottom: 24px;">
                        ${incomeList.length > 0 ? incomeList : '<li>לא נרשמו הכנסות.</li>'}
                    </ul>
                    <h3 style="color: #d32f2f; margin-bottom: 8px;">הוצאות</h3>
                    <ul style="padding-right: 20px; margin-top: 0; margin-bottom: 24px;">
                        ${expensesList.length > 0 ? expensesList : '<li>לא נרשמו הוצאות.</li>'}
                    </ul>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                        <tr>
                            <td style="padding: 8px; border: 1px solid #e0e0e0;"><b>סה"כ הכנסות:</b></td>
                            <td style="padding: 8px; border: 1px solid #e0e0e0; color: #388e3c;">${totalIncome} ש"ח</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #e0e0e0;"><b>סה"כ הוצאות:</b></td>
                            <td style="padding: 8px; border: 1px solid #e0e0e0; color: #d32f2f;">${totalExpenses} ש"ח</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #e0e0e0;"><b>יתרה נוכחית:</b></td>
                            <td style="padding: 8px; border: 1px solid #e0e0e0; color: #1976d2;"><b>${remainingAmount} ש"ח</b></td>
                        </tr>
                    </table>
                    <div style="text-align: left; color: #888; font-size: 13px;">
                        <span>נשלח אוטומטית ממערכת Financial-for-you</span>
                    </div>
                </div>
            </div>
        `
    };
    await transporter.sendMail(mailOptions);
}

// הגדרת אסטרטגיית גוגל
function configureGoogleStrategy() {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value });
        }
        console.log("PROFILE:", profile);
        console.log("USER FOUND:", user);
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            password: Math.random().toString(36)
          });
          await user.save();
        } else if (!user.googleId) {
          user.googleId = profile.id;
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  ));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
}
// נתיב התחברות עם גוגל
function googleAuth(req, res, next) {
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
}
// callback מגוגל
function googleCallback(req, res, next) {
  passport.authenticate('google', { failureRedirect: '/login' }, (err, user) => {
    if (err || !user) {
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.redirect('/login');
      }
      // הפנה ל-React עם פרטי המשתמש אם צריך
      const token = createToken1(user);
      return res.redirect(`http://localhost:5173/google-success?userId=${user._id}&name=${user.name}&email=${user.email}&token=${token}`);
    });
  })(req, res, next);
}
// משימה יומית בשעה 08:00 (שנה לשעה שתרצה)
cron.schedule('0 0 * * *', async () => {
    try {
        const users = await User.find({ sumMoney: { $lt: 0 } });
        for (const user of users) {
            await sendNegativeBalanceEmail(user.email, user.name, user.sumMoney);
        }
        console.log('Negative balance emails sent');
    } catch (err) {
        console.error('Error sending negative balance emails:', err);
    }
});
module.exports = { 
  addUser,
  IfUserExists, 
  configureGoogleStrategy, 
  googleAuth, 
  googleCallback,
  addReportTime 
};
async function sendNoReportEmail(email) {
    let mailOptions = {
        from: '"Financial-for-you" <financialman123456789@gmail.com>',
        to: email,
        subject: 'דו"ח כספי יומי',
        html: `
            <div style="direction: rtl; font-family: Arial, sans-serif; background: #f8f9fa; padding: 24px;">
                <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 12px; border: 1px solid #e0e0e0; box-shadow: 0 2px 8px #eee; padding: 32px;">
                    <h2 style="color: #1976d2;">דו"ח כספי יומי</h2>
                    <p style="color: #888; font-size: 16px;">לא נמצאו הכנסות או הוצאות בשבוע האחרון.</p>
                    <div style="text-align: left; color: #888; font-size: 13px;">
                        <span>נשלח אוטומטית ממערכת Financial-for-you</span>
                    </div>
                </div>
            </div>
        `
    };
    await transporter.sendMail(mailOptions);
}
async function sendNegativeBalanceEmail(email, name, sumMoney) {
    let mailOptions = {
        from: '"Financial-for-you" <financialman123456789@gmail.com>',
        to: email,
        subject: 'יתרה שלילית בחשבונך',
        html: `
            <div style="direction: rtl; font-family: Arial, sans-serif; background: #f8f9fa; padding: 24px;">
                <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 12px; border: 1px solid #e0e0e0; box-shadow: 0 2px 8px #eee; padding: 32px;">
                    <h2 style="color: #d32f2f;">אזהרה: יתרה שלילית</h2>
                    <p>שלום ${name},</p>
                    <p>היתרה שלך בחשבון ירדה מתחת לאפס: <b style="color: #d32f2f;">${sumMoney} ש"ח</b></p>
                    <p>אנא בדוק את מצבך הכלכלי והימנע ממינוס נוסף.</p>
                    <div style="text-align: left; color: #888; font-size: 13px;">
                        <span>נשלח אוטומטית ממערכת Financial-for-you</span>
                    </div>
                </div>
            </div>
        `
    };
    await transporter.sendMail(mailOptions);
}