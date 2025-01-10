import { useState } from 'react'
import { useSelector } from 'react-redux';
import './App.css'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { IntlProvider } from 'react-intl';
import MainPage from '@modules/Main/index'
import locale from '@locale/index'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
//import Login from '@components/Login';
import LoginPage from '@modules/Auth/Login';
import SigninPage from '@modules/Auth/Signin';
import { AuthProvider } from '@providers/auth/auth'
import ForgotPage from '@/modules/Auth/Forgot';
import ResetPage from '@/modules/Auth/Reset';

function App() {
  const lang = useSelector((state : any) => state.commonReducer.language);
  return (
    <>
      <IntlProvider locale={lang} messages={locale[lang]}>
        <AuthProvider>
          <PrimeReactProvider >
            <Routes>
                <Route path='/' element={<Navigate to="/main" />} />
                <Route path="*" element={<Navigate to="/main" />} />
                <Route path='/main' element={<MainPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signin' element={<SigninPage />} />
                <Route path='/forgot' element={<ForgotPage />} />
                <Route path='/reset' element={<ResetPage />} />
            </Routes>        
          </PrimeReactProvider>
        </AuthProvider>
      </IntlProvider>
    </>
  )
}

export default App
