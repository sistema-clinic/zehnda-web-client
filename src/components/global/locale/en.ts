let locales = {};

import welcome from '../../Welcome/locale/en'
locales = { ...locales, ...welcome };

import login from '../../Auth/Login/locale/en'
locales = { ...locales, ...login };

import signin from '../../Auth/Signin/locale/en'
locales = { ...locales, ...signin };

import forgot from '../../Auth/Forgot/locale/en'
locales = { ...locales, ...forgot };

import reset from '../../Auth/Reset/locale/en'
locales = { ...locales, ...reset };

export default locales;