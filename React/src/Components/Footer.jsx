import '../Css/footer.css';
const Footer = () => {
    const ContactUs = () => {
        const mailto = `https://mail.google.com/mail/?view=cm&fs=1&to=financialman123456789@gmail.com&su=פנייה מהמערכת`;
        window.open(mailto, '_blank');
    }
    return (
        <>
            <footer className="main-footer">
                <div>© 2025 Financial Manager. כל הזכויות שמורות.</div>
                <div className="footer-links">
                    <a href="/privacy-policy">מדיניות פרטיות</a> | <a onClick={()=>ContactUs()} style={{cursor:'pointer'}}>צור קשר</a>
                </div>
            </footer>
        </>
    )

}
export default Footer