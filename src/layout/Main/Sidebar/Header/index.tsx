/**********************************************************
 * Componente: SidebarHeader
 * Desarrolador: Carlos Morante
 * Feha: 20 Diciembre 2024
***********************************************************/
import styled from '@emotion/styled';
import { SidebarHeaderProps } from '@/global/interfaces';
import logo from '@assets/isotype.svg';

const StyledSidebarHeader = styled.div`
    height: 64px;
    min-height: 64px;
    display: flex;
    align-items: center;
    padding: 0 20px;

    > div {
        width: 100%;
        overflow: hidden;
    }
`;

/**
 * Comopnente del encabezado del menu lateral
 * @param param0 
 * @returns 
 */
const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed, rtl, ...rest }) => {
    return (
      <StyledSidebarHeader {...rest}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className='flex items-center justify-center w-full'>
                <img src={logo} alt="Logo" className='w-10 h-10' />
                <h2 style={{ display: collapsed ? 'none' : 'block' }} className='text-2xl font-black logocolor pl-2'>{ import.meta.env.VITE_APP_TITLE}</h2>
            </div>                  
        </div>
      </StyledSidebarHeader>
    );
};

export default SidebarHeader;