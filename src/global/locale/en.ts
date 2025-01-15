let locales = {
    code : "Hello",
    warning : "Warning"
}

import components from '@components/global/locale/en'
locales = { ...locales, ...components };

import modules from '@modules/global/locale/en'
locales = { ...locales, ...modules };

export default locales