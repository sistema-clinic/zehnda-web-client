/**********************************************************
 * Componente: utilities
 * Desarrolador: Carlos Morante
 * Feha: 20 Diciembre 2024
***********************************************************/
import Logger from "@utils/log/logging"

/**
 * Crea un arbol de menu a partir de una lista de elementos
 * @param menuItems 
 * @param messages 
 * @param template 
 * @param badges 
 * @returns 
 */
const buildMenuTree = (menuItems: any[], messages: any, template: Map<string, any>, badges: Map<number, any>): any[] => {
    const menuMap = new Map<number, any>();
    const roots: any[] = [];
    const log: Logger = Logger.getInstance()

    // Crear un mapa de los elementos por ID
    menuItems.forEach(item => {
        if(item.visible){
            let menu : any = {}
            menu.id = item.id,
            menu.label = messages[item.lang_code]
            menu.page = item.page
            menu.position = item.position
            if(item.icon){
                menu.icon = item.icon
            }     

            console.log(typeof(item.template))
            if(template.get(item.template)){
                menu.template = template.get(item.template)
            }

            if(badges.get[item.id]){
                menu.template = template.get[item.template]
            }

            menuMap.set(
                item.id,
                menu
            );      
        }
    });

    // Construir la jerarquía
    menuItems.forEach(item => {
        if (item.parent !== null) {
            const parentMenu = menuMap.get(item.parent);
            if (parentMenu) {
                if(!parentMenu.items){
                    parentMenu.items = []
                }
                parentMenu.items.push(menuMap.get(item.id));
            }
        } else {
            roots.push(menuMap.get(item.id));
        }
    });
    log.log(roots)
    return roots;
};

export {
    buildMenuTree
}