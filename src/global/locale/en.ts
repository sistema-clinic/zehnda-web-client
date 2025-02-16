let locales = {
    code : "Hello",
    warn : "Warning",
    success : "Success",
    info : "Information",
    error : "Error",
    secondary : "Secondary",
    contrast : "Contrast",
    usermenu_profile : "Profile",
    usermenu_change_picture: "Change Picture",
    usermenu_settings: "Settings",
    usermenu_change_password: "Change Password",
    uppermenu_home: "Home",
    uppermenu_contacts:"Contacts",
    sidebarmenu_eqresume: "Equipment",
    sidebarmenu_prev_mto: "Preventive Maint.",
    sidebarmenu_prev_pending: "Pendings",
    sidebarmenu_corr_mto: "Corrective Maint.",
    sidebarmenu_techs: "Technicians",
    sidebarmenu_corr_pending: "Pendings"
}

import components from '@components/global/locale/en'
locales = { ...locales, ...components };

import modules from '@modules/global/locale/en'
locales = { ...locales, ...modules };

export default locales