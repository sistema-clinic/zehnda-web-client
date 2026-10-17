let locales = {};

import profile from '../../User/Profile/locale/en'
locales = { ...locales, ...profile };

import changePassword from '../../User/ChangePassword/locale/en'
locales = { ...locales, ...changePassword };

import AuthApply from '../../Auth/Apply/locale/en'
locales = { ...locales, ...AuthApply };

import ChangePic from '../../User/ChangePicture/locale/en'
locales = { ...locales, ...ChangePic };

import Dashboard from '../../Dashboard/locale/en'
locales = { ...locales, ...Dashboard };

export default locales;