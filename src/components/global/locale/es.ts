let locales = {};

import welcome from '../../Welcome/locale/es'
locales = { ...locales, ...welcome };

import login from '../../Auth/Login/locale/es'
locales = { ...locales, ...login };

import signin from '../../Auth/Signin/locale/es'
locales = { ...locales, ...signin };

import forgot from '../../Auth/Forgot/locale/es'
locales = { ...locales, ...forgot };    

import reset from '../../Auth/Reset/locale/es'
locales = { ...locales, ...reset };

import verify from '../../Auth/VerifyEmail/locale/es'
locales = { ...locales, ...verify };

export default locales;