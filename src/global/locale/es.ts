let locales = {
    code : "Hola",
    warning : "Advertencia"
}

import welcome from '@components/global/locale/es'
locales = { ...locales, ...welcome };

export default locales