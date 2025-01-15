let locales = {};

import profile from '../../User/Profile/locale/es'
locales = { ...locales, ...profile };

import changePassword from '../../User/ChangePassword/locale/es'
locales = { ...locales, ...changePassword };

export default locales;