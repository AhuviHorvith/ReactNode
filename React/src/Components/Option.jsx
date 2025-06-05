import '../Css/Option.css';
import { Link } from 'react-router-dom';
const Option = () => {
    return (
        <>
            <div className="div-ads">
                <div className="ads-container">
                    <Link to="/Expenses" className="ad-card-link">
                        <div className="ad-card">
                            <h1>הוצאות</h1>
                            <p>נהל את כל ההוצאות שלך במקום אחד, בקלות וביעילות.</p>
                        </div>
                    </Link>
                    <Link to="/Revenue" className="ad-card-link">
                        <div className="ad-card">
                            <h1>הכנסות</h1>
                            <p>עקוב אחרי כל מקורות ההכנסה שלך והישאר בשליטה.</p>
                        </div>
                    </Link>
                    <Link to="/Balance" className="ad-card-link">
                        <div className="ad-card">
                            <h1>יתרה</h1>
                            <p>בדוק את מצב היתרה שלך בכל רגע וקבל תובנות פיננסיות.</p>
                        </div>
                    </Link>
                </div>
            </div>

        </>
    )
}
export default Option;