import { Sidebar, Menu, MenuItem, SubMenu, MenuItemStyles, menuClasses } from 'react-pro-sidebar';
import { useState, useEffect } from 'react';
import Graph from '@/modules/Main/Sidebar/Icons/Graph';
import Doc from '@/modules/Main/Sidebar/Icons/Doc';
import Calendar from '@/modules/Main/Sidebar/Icons/Calendar';
import SidebarBadge from '@/modules/Main/Sidebar/Badge';
import SidebarHeader from '@/modules/Main/Sidebar/Header';
import React from 'react';
import SidebarFooter from '@/modules/Main/Sidebar/Footer';
import './index.scss';

type Theme = 'light' | 'dark';

const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
  
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const SidebarMenu: React.FC = () => {
    const [theme, setTheme] = useState<Theme>('dark');
    const [hasImage, setHasImage] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [rtl, setRtl] = useState(false);
    const [hideSidebar, setHideSidebar] = useState(false);

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
    return (
        <>
            <Sidebar 
                collapsed={collapsed}
                backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, hasImage ? 0.9 : 1)}
                rootStyles={{
                    color: themes[theme].sidebar.color,
                    display: hideSidebar ? 'none' : 'block',
                    transition: 'all 0.3s ease-in-out',
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        

                        <SidebarHeader rtl={rtl} collapsed={collapsed} style={{ marginBottom: '0px', marginTop: '0px' }} />
                        <div className="border-b" style={{ borderColor: themes[theme].sidebar.borderColor }}></div>
                        <Menu className='h-full' menuItemStyles={menuItemStyles}>
                            <SubMenu icon={<Graph size={18} />} label="Charts">
                            <MenuItem suffix={<SidebarBadge variant="info" shape="circle"> 1 </SidebarBadge>}> Pie charts </MenuItem>
                            <MenuItem> Line charts </MenuItem>
                        </SubMenu>
                        <MenuItem icon={<Doc size={18} />}> Documentation </MenuItem>
                        <MenuItem icon={<Calendar size={18} />}> Calendar </MenuItem>
                        </Menu>
                        <SidebarFooter collapsed={collapsed} onClick={toggleSidebar} />
                    </div>
                    
            </Sidebar>
        </>        
    )
}

export default React.memo(SidebarMenu);