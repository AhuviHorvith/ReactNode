import { useState } from "react";

const useAuthValidation = () => {
  const [errors, setErrors] = useState({});

  const validate = ({ name, email, password }, isRegistering) => {
    const newErrors = {};
    if (isRegistering && (!name || !name.trim())) {
      newErrors.name = "יש למלא את השם";
    }
    if (!email || !email.trim()) {
      newErrors.email = "יש למלא את כתובת המייל";
    } else if (!/^[\w-.]+@gmail\.com$/.test(email.trim())) {
      newErrors.email = "יש להזין כתובת Gmail בלבד";
    }
    if (!password || !password.trim()) {
      newErrors.password = "יש למלא את הסיסמה";
    } else if (password.length < 6) {
      newErrors.password = "הסיסמה חייבת להיות לפחות 6 תווים";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};

export default useAuthValidation;