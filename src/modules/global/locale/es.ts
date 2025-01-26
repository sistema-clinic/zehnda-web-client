let locales = {};

import profile from '../../User/Profile/locale/es'
locales = { ...locales, ...profile };

import changePassword from '../../User/ChangePassword/locale/es'
locales = { ...locales, ...changePassword };

import AuthApply from '../../Auth/Apply/locale/es'
locales = { ...locales, ...AuthApply };

import ChangePic from '../../User/ChangePicture/locale/es'
locales = { ...locales, ...ChangePic };

export default locales;