import { Sidebar, Menu, MenuItem, SubMenu, MenuItemStyles, menuClasses } from 'react-pro-sidebar';
import { useState, useEffect, useMemo } from 'react';
import Graph from '@layout/Main/Sidebar/Icons/Graph';
import Doc from '@layout/Main/Sidebar/Icons/Doc';
import Calendar from '@layout/Main/Sidebar/Icons/Calendar';
import SidebarHeader from '@layout/Main/Sidebar/Header';
import React from 'react';
import SidebarFooter from '@layout/Main/Sidebar/Footer';
import './index.scss';
import { useAuth } from '@/contexts/auth/auth';
import Logger from '@/utils/log/logging';
import { useIntl } from 'react-intl';
import { buildMenuTree } from '@/utils/utilities/utilities';
import { useSelector } from 'react-redux';
import Maintenance from './Icons/Maintenance';
import Tool from './Icons/Tool';
import Tech from './Icons/Tech';

type Theme = 'light' | 'dark';

const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
  
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const SidebarMenu: React.FC = () => {
    const log = Logger.getInstance();
    const [theme] = useState<Theme>('dark');
    const [hasImage] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [rtl] = useState(false);
    const [hideSidebar, setHideSidebar] = useState(false);
    const user : any = useAuth();
    const {messages} = useIntl();
    const commonReducer = useSelector((state : any) => state.commonReducer);
    
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    }

    const updateSidebar = () => {
        if (window.innerWidth < 768) {
            setHideSidebar(true);
          } else {
            setHideSidebar(false);
          }
    }

    useEffect(() => {
        updateSidebar();
        window.addEventListener("resize", updateSidebar);
        return () => {
          window.removeEventListener("resize", updateSidebar);
        };
    }, []);

    const themes = {
        light: {
            sidebar: {
                backgroundColor: '#e5e7eb',
                color: '#607489',
                borderColor: '#f3f4f6',
            },
            menu: {
                menuContent: '#fbfcfd',
                icon: '#0098e5',
                hover: {
                    backgroundColor: '#c5e4ff',
                    color: '#44596e',
                },
                disabled: {
                    color: '#9fb6cf',
                },
            },
        },
        dark: {
            sidebar: {
                backgroundColor: '#0b2948',
                color: '#8ba1b7',
                borderColor: '#00458b',
            },
            menu: {
                menuContent: '#082440',
                icon: '#59d0ff',
                hover: {
                    backgroundColor: '#00458b',
                    color: '#b6c8d9',
                },
                disabled: {
                    color: '#3e5e7e',
                },
            },
        },
    };

    const menuItemStyles: MenuItemStyles = {
        root: {
            fontSize: '15px',
            fontWeight: 400,
        },
        icon: {
            color: themes[theme].menu.icon,
            [`&.${menuClasses.disabled}`]: {
                color: themes[theme].menu.disabled.color,
            },
        },
        SubMenuExpandIcon: {
            color: '#b6b7b9',
        },
        subMenuContent: ({ level }) => ({
            backgroundColor:
                level === 0
                ? hexToRgba(themes[theme].menu.menuContent, hasImage && !collapsed ? 0.4 : 1)
                : 'transparent',
        }),
        button: {
            [`&.${menuClasses.disabled}`]: {
                color: themes[theme].menu.disabled.color,
            },
            '&:hover': {
                backgroundColor: hexToRgba(themes[theme].menu.hover.backgroundColor, hasImage ? 0.8 : 1),
                color: themes[theme].menu.hover.color,
            },
        },
        label: ({ open }) => ({
            fontWeight: open ? 600 : undefined,
        }),
    };

    const sidebarMemoMenu = useMemo(() => {
        let menus: any[] = []
        if(user?.internalUserdata?.internalData?.role?.menu){
            let menuData: any = user?.internalUserdata?.internalData?.role.menu.filter((e) => e.type === 'SIDEBAR')
            log.log(JSON.stringify(menuData))
            const templates : Map<string, any> = new Map<string, any>()

            const badges : Map<number, any> = new Map<number, any>()
            menus = buildMenuTree(menuData, messages, templates, badges)
        }

        return menus
    }, [user.internalUserdata.internalData.role.menu, commonReducer.language])

    const getIcon = (icon) =>{
        try {
            if (icon === 'Doc'){
                return <Doc size={18} />
            }
            if (icon === 'Tool'){
                return <Tool size={18} />
            }
            if (icon === 'Maintenance'){
                return <Maintenance size={18} />
            }
            if (icon === 'Tech'){
                return <Tech size={18} />
            }
            if (icon === 'Calendar'){
                return <Calendar size={18} />
            }
            if (icon === 'Graph'){
                return <Graph size={18} />
            }
        } catch (error) {
            
        }     
    }

    return (
        <>
            <Sidebar 
                collapsed={collapsed}
                backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, hasImage ? 0.9 : 1)}
                rootStyles={{
                    color: themes[theme].sidebar.color,
                    display: hideSidebar ? 'none' : 'block',
                    transition: 'all 0.3s ease-in-out'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <SidebarHeader rtl={rtl} collapsed={collapsed} style={{ marginBottom: '0px', marginTop: '0px' }} />
                        <div className="border-b" style={{ borderColor: themes[theme].sidebar.borderColor }}></div>
                        <Menu className='h-full' menuItemStyles={menuItemStyles}>
                        {sidebarMemoMenu.map((e) => 
                            !e.items ? (
                                <MenuItem key={e.id} icon={getIcon(e.icon)} > {e.label} </MenuItem>
                            )
                            :
                            (
                                <SubMenu key={e.id} icon={getIcon(e.icon)} label={e.label} >
                                    {
                                        e.items.map((s) =>  <MenuItem key = {s.id}> {s.label} </MenuItem>)
                                    }
                                </SubMenu>
                            )
                        )}
                        </Menu>      
                        <SidebarFooter collapsed={collapsed} onClick={toggleSidebar} /> 
                        
                    </div>
                    
            </Sidebar>
        </>        
    )
}

export default React.memo(SidebarMenu);