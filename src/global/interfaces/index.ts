/**********************************************************
 * Descripcion: Interfaces generales de la app
 * Desarrolador: Carlos Morante
 * Feha: 22 Diciembre 2024
***********************************************************/
export interface IconProps extends React.SVGAttributes<HTMLOrSVGElement> {
    size?: number;
    rotate?: number;
  }

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  rtl: boolean;
  collapsed: boolean;
}

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  collapsed?: boolean;
}
