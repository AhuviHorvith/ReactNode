import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../Store/UserSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";

const GoogleSuccess = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // שלוף את הפרמטרים מה-URL
        const params = new URLSearchParams(location.search);
        const name = params.get("name");
        const email = params.get("email");
        const token = params.get("token");
        debugger
        localStorage.setItem('token', token);
        // אפשר להוסיף עוד פרטים אם יש

        if (name && email) {
            dispatch(setUser({
                _id: "", // אם יש לך מזהה מהשרת, תכניס כאן
                name,
                email,
                sumMoney: 0,
                categories: [],
                Incomes: []
            }));
            <Link to="/Home" />;
            navigate("/Home");
        }
    }, [dispatch, location, navigate]);

    return <div>מתחבר עם גוגל...</div>;
};

export default GoogleSuccess;