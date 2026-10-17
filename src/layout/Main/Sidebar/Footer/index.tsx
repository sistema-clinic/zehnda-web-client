/**********************************************************
 * Componente: SidebarFooter
 * Desarrolador: Carlos Morante
 * Feha: 20 Diciembre 2024
***********************************************************/
import { SidebarFooterProps } from '@/global/interfaces';
import styled from '@emotion/styled';
import Toggler from '@layout/Main/Sidebar/Icons/Toggler';

const StyledCollapsedSidebarFooter = styled.span`
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  color: white;
  background: linear-gradient(45deg, rgb(21 87 205) 0%, rgb(90 225 255) 100%);
  /* background: #0098e5; */
`;

/**
 * Pie de pagina del menu lateral
 * @param param0 
 * @returns 
 */
const SidebarFooter: React.FC<SidebarFooterProps> = ({ children, onClick, collapsed, ...rest }) => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '20px',
        }}
      >
        {/* Boton para colapsar el menu */}
        {collapsed ? (
          <StyledCollapsedSidebarFooter onClick={onClick}>
            <Toggler size={18} />
          </StyledCollapsedSidebarFooter>
        ) : (
          <StyledCollapsedSidebarFooter onClick={onClick}>
            <Toggler size={18} rotate={180} />
          </StyledCollapsedSidebarFooter>
        )}
      </div>
    );
  };

  export default SidebarFooter;