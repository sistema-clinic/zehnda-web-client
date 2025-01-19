import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getWelcomeText } from '@/global/redux/actions'
import { AppDispatch } from '@/global/redux/store';
import { useIntl } from 'react-intl';
import { doSignOut } from '@/utils/firebaseapi/authUtil';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Sidebar, Menu, SubMenu, MenuItem } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
    const {messages} = useIntl();
    const welcomeReducer = useSelector((state : any) => state.welcomeReducer);
    const commonReducer = useSelector((state : any) => state.commonReducer);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [value, setValue] = useState('')
    const [pass, setPass] = useState('')
    useEffect(() => {
        dispatch(getWelcomeText({WelcomeText : " Carlos Morante"}))
    }, [])

    return (
        <>
            {messages.welcome_greetings}  {welcomeReducer.WelcomeText}
            <span> {commonReducer.language}</span>
            <br/><br/>
            <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='text-sm text-blue-600 underline'>Logout</button>
            <Button label="Submit" className='pointerclick' icon="pi pi-check" ></Button>
            <br/><br/>
            <FloatLabel>
                <InputText id="username" value={value} onChange={(e) => setValue(e.target.value)} />
                <label htmlFor="username">Username</label>
            </FloatLabel>
            <Password value={pass} onChange={(e) => setPass(e.target.value)} />
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search"> </InputIcon>
                <InputText placeholder="Search" />
            </IconField>
            <Sidebar collapsed={false}>
                <Menu>
                    <SubMenu label="Charts">
                    <MenuItem> Pie charts </MenuItem>
                    <MenuItem> Line charts </MenuItem>
                    </SubMenu>
                    <MenuItem> Documentation </MenuItem>
                    <MenuItem> Calendar </MenuItem>
                </Menu>
                <span className="font-sans text-gray-200 ">Collapsea</span>
            </Sidebar>
        </>
    );
};

export default Welcome;