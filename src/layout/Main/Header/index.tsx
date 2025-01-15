import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';  
import { BreadCrumb } from 'primereact/breadcrumb';
import { OverlayPanel } from 'primereact/overlaypanel';
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/contexts/auth/auth';
import userImage from '@/assets/user.svg'
import { Menu } from 'primereact/menu';
import { doSignOut } from '@/utils/firebaseapi/authUtil';
import { useNavigate } from 'react-router-dom';
import { changePage } from '@/global/redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/global/redux/store';
import Logger from '@/utils/log/logging';

const Header: React.FC = () => {
    const op = useRef<OverlayPanel>(null);
    const user : any = useAuth();
    const [avatarUrl, setAvatarUrl] = useState<string>(userImage);
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const log = Logger.getInstance();
    const commonReducer = useSelector((state : any) => state.commonReducer);
    
    const menuHandler = (item) => {
        log.log(item);
        switch(item.id) {
            case '1':
                dispatch(changePage({page : 'profile'}))
                break;
            case '2':
                dispatch(changePage({page : 'profile'}))
                break;
            case '3':
                dispatch(changePage({page : 'changePassword'}))
                break;
            case '4':
                doSignOut().then(() => {
                    navigate('/login');
                });
                break;
        }
    }

    useEffect(() => {
        log.log(commonReducer);
    }, [commonReducer]);

    useEffect(() => {
        const preloadImage = async (url: string) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => {
                    setAvatarUrl(url);
                    resolve(url);
                };
                img.onerror = (e) => {
                    setAvatarUrl(userImage);
                    reject();
                };
            });
        };

        if (user.currentUser?.photoURL) {
            preloadImage(user.currentUser.photoURL).catch(() => {

            });
        }
    }, [user.currentUser?.photoURL]);

    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link p-3" onClick={() => {menuHandler(item)}}> 
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );

    
    const itemUserRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link p-2" onClick={() => {console.log(item)}}> 
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
        </a>
    );

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            label: 'Features',
            icon: 'pi pi-star'
        },
        {
            label: 'Projects',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'Core',
                    icon: 'pi pi-bolt',
                    shortcut: '⌘+S',
                    template: itemRenderer
                },
                {
                    label: 'Blocks',
                    icon: 'pi pi-server',
                    shortcut: '⌘+B',
                    template: itemRenderer
                },
                {
                    label: 'UI Kit',
                    icon: 'pi pi-pencil',
                    shortcut: '⌘+U',
                    template: itemRenderer
                },
                {
                    separator: true
                },
                {
                    label: 'Templates',
                    icon: 'pi pi-palette',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette',
                            badge: 2,
                            template: itemRenderer
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette',
                            badge: 3,
                            template: itemRenderer
                        }
                    ]
                }
            ]
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope',
            badge: 3,
            template: itemRenderer
        }
    ];

    let userItems = [
        { label: user.currentUser?.email, id : '1', icon: 'pi pi-user', template: itemRenderer  },
        {
            separator: true
        },
        { label: 'Settings',
            items:[
                { label: 'Profile', id : '2', icon: 'pi pi-user-edit', template: itemRenderer },
                { label: 'Change Password', id : '3', icon: 'pi pi-key', template: itemRenderer }
            ]
        },
        { label: 'Logout',
            items:[
                { label: 'Logout', id : '4', icon: 'pi pi-sign-out', template: itemRenderer }
            ]
        }
    ];

    const home = { icon: 'pi pi-home', url: '/main' }

    const end = (
        <div className="flex align-items-center gap-2">
            <Avatar 
                style={{ cursor: 'pointer' }} 
                image={avatarUrl} 
                onClick={(e) => op.current.toggle(e)} 
                shape="circle" 
            />
            <OverlayPanel unstyled ref={op}>
                <Menu 
                    style={{ cursor: 'pointer'}}
                      onClick={(e) => {op.current.hide(); console.log(e)}} 
                      model={userItems} 
                      className="w-full md:w-15rem" />
            </OverlayPanel> 
        </div>
    );

    return (
        <>
            <Menubar pt={{ root: { style: { 
                borderRadius: '0px', 
                borderBottom: '1px solid #e5e7eb', 
                borderTop: '0px solid #e5e7eb', 
                borderLeft: '0px solid #e5e7eb',
                borderRight: '0px solid #e5e7eb',            
                cursor: 'pointer' } } }} className='font-sans' model={items} end={end} />
            <BreadCrumb 
                pt={{ root: { style: { 
                    borderRadius: '0px', 
                    height: '50px',         
                    borderBottom: '1px solid #e5e7eb', 
                    borderTop: '0px solid #e5e7eb', 
                    borderLeft: '0px solid #e5e7eb',
                    borderRight: '0px solid #e5e7eb',            
                    cursor: 'pointer' } } }} className='font-sans text-sm'
            model={commonReducer.breadCrumb} home={home} />
        </>
    );
};

export default React.memo(Header);