let locales = {
    code : "Hola",
    warning : "Advertencia"
}

import components from '@components/global/locale/es'
locales = { ...locales, ...components };

import modules from '@modules/global/locale/es'
locales = { ...locales, ...modules };

export default locales