import { createAction } from '@reduxjs/toolkit';

const resetALL = createAction('RESET/ALL');
export { resetALL }

import { changePage, setBreadCrumb, setUserLanguage } from './slice'
export * from '../../components/global/redux/actions'
export * from '../../utils/global/redux/actions'
export * from '../../modules/global/redux/actions'
export * from '../redux/slice'
export {
    changePage,
    setBreadCrumb,
    setUserLanguage
}