/**********************************************************
 * Componente: Header
 * Desarrolador: Carlos Morante
 * Feha: 20 Diciembre 2024
***********************************************************/
import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';  
import { BreadCrumb } from 'primereact/breadcrumb';
import { OverlayPanel } from 'primereact/overlaypanel';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '@/contexts/auth/auth';
import userImage from '@/assets/user.svg'
import { Menu } from 'primereact/menu';
import { doSignOut } from '@/utils/firebaseapi/authUtil';
import { useNavigate } from 'react-router-dom';
import { changePage, resetALL } from '@/global/redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/global/redux/store';
import Logger from '@/utils/log/logging';
import { buildMenuTree } from '@/utils/utilities/utilities';
import { useIntl } from 'react-intl';
import './index.scss'
import { Button } from 'primereact/button';

/**
 * Componente que muestra la barra principal de la app
 * @param param0 
 * @returns 
 */
const Header: React.FC = () => {
    const op = useRef<OverlayPanel>(null);
    const opAlerts = useRef<OverlayPanel>(null);
    const user : any = useAuth();
    const userInfo = useSelector((state: any) => state.userReducer.user);
    const [avatarUrl, setAvatarUrl] = useState<string>(userImage);
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const log = Logger.getInstance();
    const commonReducer = useSelector((state : any) => state.commonReducer);
    const {messages} = useIntl();
    
    const menuHandler = (item) => {
        log.log('item: ', item);
        if((!item && !item?.page) || (item && item?.page === '') ){
            switch(item.id) {
                case '1000':
                    dispatch(changePage({page : 'profile'}))
                    break;
                case '1001':
                    doSignOut().then(() => {
                        dispatch(resetALL());
                        navigate('/login');
                    });
                    break;
            }
        }
        else [
            dispatch(changePage({page : item.page}))
        ]
        
    }

    useEffect(() => {
        log.log('commonReducer: ', commonReducer);
    }, [commonReducer.language]);

    useEffect(() => {
        if(userInfo && userInfo.photoUrl && userInfo.photoUrl !== '') {
            setAvatarUrl(userInfo.photoUrl);
        }
        else if(user?.internalUserdata?.internalData?.photoUrl && user?.internalUserdata?.internalData?.photoUrl !== '') {
            setAvatarUrl(user.internalUserdata.internalData.photoUrl );
        }
        else if (user.currentUser?.photoURL && user.currentUser?.photoURL !== '') {
            log.log(user)
            setAvatarUrl(user.currentUser?.photoURL);
        }
        else{
            setAvatarUrl(userImage);
        }

    }, [userInfo, user?.internalUserdata?.internalData?.photoUrl]);

    const itemRenderer = (item) => (
        <a className={`flex align-items-center p-menuitem-link p-3` } onClick={() => {menuHandler(item)}}> 
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );
    const itemRendererUser = (item: any) => (
        <a className={`flex align-items-center p-menuitem-link p-3`} onClick={() => {menuHandler(item)}}>
            <span className={item.icon} />
            <span className="mx-4">{item.label}</span>
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );

    const userMemoMenu = useMemo(() => {
        let menus: any[] = []
        if(user?.internalUserdata?.internalData?.role?.menu){
            let menuData: any = user?.internalUserdata?.internalData?.role.menu.filter((e) => e.type === 'USER')
            log.log(JSON.stringify(menuData))
            const templates : Map<string, any> = new Map<string, any>()
            templates.set("itemRenderer", itemRenderer)
            templates.set("itemRendererUser", itemRendererUser)

            const badges : Map<number, any> = new Map<number, any>()
            menus = buildMenuTree(menuData, messages, templates, badges)
            menus.unshift({ separator: true })
            menus.unshift({ label: user.currentUser?.email, id : '1000', icon: 'pi pi-user', template: itemRenderer, page: '' })
            const logout = { 
                label: 'Logout',
                items:[
                    { label: 'Logout', id : '1001', icon: 'pi pi-sign-out', template: itemRenderer, page: '' }
                ]
            }
            menus.push(logout)
        }
        
        return menus
    }, [user.internalUserdata.internalData.role.menu, commonReducer.language])


    const upperMemoMenu = useMemo(() => {
        let menus: any[] = []
        if(user?.internalUserdata?.internalData?.role?.menu){
            let menuData: any = user?.internalUserdata?.internalData?.role.menu.filter((e) => e.type === 'UPPER')
            log.log(JSON.stringify(menuData))
            const templates : Map<string, any> = new Map<string, any>()
            templates.set("itemRenderer", itemRenderer)
            templates.set("itemRendererUser", itemRendererUser)

            const badges : Map<number, any> = new Map<number, any>()
            menus = buildMenuTree(menuData, messages, templates, badges)
        }
        return menus
    }, [user.internalUserdata.internalData.role.menu, commonReducer.language])

    const home = { icon: 'pi pi-home', url: '/main' }

    const end = (
        <div className="flex align-items-center gap-3">
            <div className="p-overlay-badge">
                <Button type="button" className="p-link layout-topbar-button p-overlay-badge" onClick={(e) => opAlerts.current.toggle(e)} >
                    <i className="pi pi-bell"></i>
                </Button>
                <Badge value="2" style={{ top: "5px", right: "4px" }}></Badge>
            </div>
            
            {/* Avatar de la app */}
            <Avatar          
                style={{ cursor: 'pointer',
                    border: '4px solid #b1a3ff', // Color del aro
                 }} 
                 pt = {{ 
                    root: { style: {
                        width: '45px',
                        height: '45px',
                    } },
                    image: { style: {
                        cursor: 'pointer'
                    } }
                }}
                image={avatarUrl} 
                onClick={(e) => op.current.toggle(e)} 
                shape="circle" 
            />
            <OverlayPanel unstyled ref={op}>
                <Menu 
                    style={{ cursor: 'pointer'}}
                    onClick={(e) => {op.current.hide(); console.log(e)}} 
                    model={userMemoMenu} 
                    className="w-full md:w-15rem" />
            </OverlayPanel> 
            <OverlayPanel unstyled ref={opAlerts}>
                <div className="flex items-center justify-center border border-[#e8e8e8] bg-gray-100 ">
                    <div className="w-96 bg-white">
                        <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold">You have 4 messages</h2>
                        </div>
                        <ul>
                        <li className="flex items-start gap-4 p-4 border-b hover:bg-gray-50">
                            <div className="w-10 h-10 rounded-full bg-red-200 flex items-center justify-center text-red-600 font-bold">!</div>
                            <div className="flex-1">
                            <h3 className="text-sm font-semibold">Urgent: System Maintenance Tonight</h3>
                            <p className="text-sm text-gray-600">Attention team, we'll be conducting critical system maintenance tonight from 10 PM to 2 AM. Plan accordingly...</p>
                            </div>
                            <span className="text-xs text-gray-500">Just now</span>
                        </li>
                        <li className="flex items-start gap-4 p-4 border-b hover:bg-gray-50">
                            <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-600 font-bold">!</div>
                            <div className="flex-1">
                            <h3 className="text-sm font-semibold">Project Update: Milestone Achieved</h3>
                            <p className="text-sm text-gray-600">Kudos on hitting sales targets last quarter! Let's keep the momentum. New goals, new victories ahead...</p>
                            </div>
                            <span className="text-xs text-gray-500">5 minutes ago</span>
                        </li>
                        <li className="flex items-start gap-4 p-4 border-b hover:bg-gray-50">
                            <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 font-bold">A</div>
                            <div className="flex-1">
                            <h3 className="text-sm font-semibold">Social Media Campaign Launch</h3>
                            <p className="text-sm text-gray-600">Exciting news! Our new social media campaign goes live tomorrow. Brace yourselves for engagement...</p>
                            </div>
                            <span className="text-xs text-gray-500">1:52 PM</span>
                        </li>

                        </ul>
                        <div className="p-4 text-center border-t">
                        <button className="text-sm text-blue-600 hover:underline">View all messages</button>
                        </div>
                    </div>
                </div>
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
                cursor: 'pointer' } } }} className='font-sans' model={upperMemoMenu} end={end} />
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