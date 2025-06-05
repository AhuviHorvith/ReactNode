import React, { useState } from 'react';
import '../Css/Home.css';
import Login from './Login.jsx';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // דוגמת נתונים (החלף לנתונים דינמיים אם תרצה)
    const data = [
        { name: 'יוני', Income: 11000, Expenses: 8000 },
        { name: 'מאי', Income: 11500, Expenses: 9500 },
        { name: 'אפר׳', Income: 10800, Expenses: 7200 },
        { name: 'מרץ', Income: 11200, Expenses: 7800 },
        { name: 'פבר׳', Income: 10900, Expenses: 8500 },
        { name: 'ינו׳', Income: 11000, Expenses: 8000 },
    ];

    return (
        <>
            <div className="div-mainly">
                <div className="animated-background">{/*אנימציות עיגולים*/}
                    <div className="circle circle1"></div>
                    <div className="circle circle2"></div>
                    <div className="circle circle3"></div>
                </div>
                <h1>נהל את הכספים שלך בקלות וביעילות</h1>
                <p>התחל לעקוב אחרי ההוצאות שלך, לחסוך יותר ולהשיג את היעדים הפיננסיים שלך.</p>
                <button className="login-button animation" onClick={handleOpenModal}>הירשם עכשיו</button>
            </div>
            <div className="div-features">
                <h2>למה לבחור בנו?</h2>
                <ul>
                    <li>מעקב הוצאות בזמן אמת</li>
                    <li>תכנון תקציב חכם</li>
                    <li>דוחות מותאמים אישית</li>
                </ul>
            </div>
            <div className="div-ads">{/* פרסומות */}
                <h2>הצעות מיוחדות</h2>
                <div className="ads-container">
                    <div className="ad-card">
                        <h3>חסוך יותר</h3>
                        <p>תכנן תקציב חכם וקבל דוחות מותאמים אישית.</p>
                    </div>
                    <div className="ad-card">
                        <h3>מעקב הוצאות</h3>
                        <p>עקוב אחרי ההוצאות שלך בזמן אמת מכל מקום.</p>
                    </div>
                    <div className="ad-card">
                        <h3>השקעות חכמות</h3>
                        <p>קבל המלצות להשקעות מותאמות אישית.</p>
                    </div>
                </div>
            </div>
            {showModal && <Login onClose={handleCloseModal} />}
            <h2 className="example-chart-title">
                גרף לדוגמא:
            </h2>
            {/* גרף הכנסות מול הוצאות */}
            <div className="income-expenses-chart-container">
                <div className="income-expenses-chart-header">
                    <span className="chart-subtitle">Last 6 months</span>
                </div>
                <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" strokeWidth={0.5} />
                        <XAxis dataKey="name" />
                        <Tooltip />
                        <Legend verticalAlign="top" />
                        <Bar dataKey="Expenses" fill="#ffa600" name="Expenses" stroke="#ffa600" strokeWidth={0.5} barSize={20} />
                        <Bar dataKey="Income" fill="#1976d2" name="Income" stroke="#1976d2" strokeWidth={0.5} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* המלצות מלקוחות */}
            <div className="testimonials-section">
                <h2 className="testimonials-title">מה הלקוחות שלנו אומרים?</h2>
                <div className="testimonials-list">
                    <div className="testimonial-card">
                        <span className="testimonial-quote">“</span>
                        <p className="testimonial-text">
                            המערכת עזרה לי סוף סוף להבין לאן הכסף שלי הולך. ממשק נוח, דוחות ברורים – ממליץ בחום!
                        </p>
                        <span className="testimonial-name">דנה לוי</span>
                        <span className="testimonial-city">תל אביב</span>
                    </div>
                    <div className="testimonial-card">
                        <span className="testimonial-quote">“</span>
                        <p className="testimonial-text">
                            בזכותכם אני חוסך הרבה יותר כל חודש. השירות פשוט מעולה!
                        </p>
                        <span className="testimonial-name">יוסי כהן</span>
                        <span className="testimonial-city">חיפה</span>
                    </div>
                    <div className="testimonial-card">
                        <span className="testimonial-quote">“</span>
                        <p className="testimonial-text">
                            אפליקציה ידידותית, עיצוב יפה, והכי חשוב – תוצאות בשטח!
                        </p>
                        <span className="testimonial-name">שרה ברק</span>
                        <span className="testimonial-city">ירושלים</span>
                    </div>
                </div>
            </div>
            {/* מטבעות והשקעות */}
            <div className="currencies-section">
                <h3>שערי מטבע והשקעות</h3>
                <div className="currencies-list">
                    <div className="currency-card">
                        <span className="currency-icon">💵</span>
                        <b>דולר</b>
                        <span>3.65 ₪</span>
                    </div>
                    <div className="currency-card">
                        <span className="currency-icon">💶</span>
                        <b>אירו</b>
                        <span>3.95 ₪</span>
                    </div>
                    <div className="currency-card">
                        <span className="currency-icon">₿</span>
                        <b>ביטקוין</b>
                        <span>₪250,000</span>
                    </div>
                    <div className="currency-card">
                        <span className="currency-icon">💷</span>
                        <b>לירה שטרלינג</b>
                        <span>4.60 ₪</span>
                    </div>
                    <div className="currency-card">
                        <span className="currency-icon">💴</span>
                        <b>ין יפני</b>
                        <span>0.025 ₪</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
