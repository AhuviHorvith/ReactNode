import React from 'react';
import { useEffect, Suspense } from 'react';
import './App.css'
import axios from 'axios';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './Store/UserSlice';
const HomeLazy = React.lazy(() => import('./Components/Home'));
const LoginLazy = React.lazy(() => import('./Components/Login'));

import GoogleSuccess from './Components/GoogleSuccess';


const ExpensesLazy = React.lazy(() => import('./Components/Expenses'))
const RevenueLazy = React.lazy(() => import('./Components/Revenue'))
const BalanceLazy = React.lazy(() => import('./Components/Balance'))
const OptionLazy = React.lazy(() => import('./Components/Option'));
const PrivacyPolicy = React.lazy(() => import('./Components/PrivacyPolicy'));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token'); // שליפת הטוקן מה-local storage
    if (token) {
      const getUserByToken = async (token) => {
        try {

          const response = await axios.get('http://localhost:8080/User/getUserByToken', {

            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const user = await response.data.user;
          dispatch(setUser(user));
          console.log(user); // תוכל לשמור את המשתמש במצב או ב-context
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };

      getUserByToken(token);
    }
  }, []); // ריק כדי שה-useEffect ירוץ רק פעם אחת כשמרכיב ה-App נטען

  const token = localStorage.getItem('token');

  return (
    <>
      <Header />
  
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomeLazy />} />
          <Route path="/Home" element={<OptionLazy />} />
          <Route path="/login" element={<LoginLazy />} />
          <Route path="/google-success" element={<GoogleSuccess />} />
          <Route path='/Balance' element={<BalanceLazy />} />
          <Route path='/Revenue' element={<RevenueLazy />} />
          <Route path='/Expenses' element={<ExpensesLazy />} />
          <Route path="/Option" element={<OptionLazy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </Suspense>
     <Footer/>
    </>
  );
}

export default App
