let locales = {};

import profile from '../../User/Profile/locale/en'
locales = { ...locales, ...profile };

import changePassword from '../../User/ChangePassword/locale/en'
locales = { ...locales, ...changePassword };

import AuthApply from '../../Auth/Apply/locale/en'
locales = { ...locales, ...AuthApply };

export default locales;