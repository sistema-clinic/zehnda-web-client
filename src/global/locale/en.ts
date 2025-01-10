let locales = {
    code : "Hello",
    warning : "Warning"
}

import welcome from '@components/global/locale/en'
locales = { ...locales, ...welcome };

export default locales