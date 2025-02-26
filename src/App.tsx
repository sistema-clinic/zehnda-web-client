/**********************************************************
 * Componente: App
 * Desarrolador: Carlos Morante
 * Feha: 15 Diciembre 2024
***********************************************************/
import { useSelector } from 'react-redux';
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { IntlProvider } from 'react-intl';
import MainPage from '@layout/Main/index'
import locale from '@locale/index'
import { PrimeReactProvider } from 'primereact/api';
import LoginPage from '@modules/Auth/Login';
import SigninPage from '@modules/Auth/Signin';
import { AuthProvider } from '@providers/auth/auth'
import ForgotPage from '@/modules/Auth/Forgot';
import ApplyCodePage from './modules/Auth/Apply';

/**
 * Componente para renderizar la aplicación principal
 * @returns 
 */
function App() {
  const lang = useSelector((state : any) => state.commonReducer.language);
  return (
    <>
      {/* Proveedor de lenguaje */}
      <IntlProvider locale={lang} messages={locale[lang]}>
        {/* Proveedor de autenticación */}
        <AuthProvider>
          {/* Proveedor de los componentes prime react */}
          <PrimeReactProvider >
            {/* Rutas */}
            <Routes>
                <Route path='/' element={<Navigate to="/main" />} />
                <Route path="*" element={<Navigate to="/main" />} />
                <Route path='/main' element={<MainPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signin' element={<SigninPage />} />
                <Route path='/forgot' element={<ForgotPage />} />
                <Route path='/apply' element={<ApplyCodePage />} />            
            </Routes>        
          </PrimeReactProvider>
        </AuthProvider>
      </IntlProvider>
    </>
  )
}

export default App
