let locales = {
    code : "Hola",
    warn : "Advertencia",
    success : "Éxito",
    info : "Información",
    error : "Error",
    secondary : "Secundario",
    contrast : "Contraste",
    usermenu_profile : "Perfil",
    usermenu_change_picture: "Cambiar Imagen",
    usermenu_settings: "Configuración",
    usermenu_change_password: "Cambiar Contraseña",
    uppermenu_home: "Inicio",
    uppermenu_contacts:"Contactos",
    sidebarmenu_eqresume: "Hoja de Vida",
    sidebarmenu_prev_mto: "Mto Preventivo",
    sidebarmenu_prev_pending: "Pendientes",
    sidebarmenu_corr_mto: "Mto Correctivo",
    sidebarmenu_techs: "Técnicos",
    sidebarmenu_corr_pending: "Pendientes"
}

import components from '@components/global/locale/es'
locales = { ...locales, ...components };

import modules from '@modules/global/locale/es'
locales = { ...locales, ...modules };

export default locales