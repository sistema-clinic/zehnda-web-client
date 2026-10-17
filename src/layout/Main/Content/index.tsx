/**********************************************************
 * Componente: Content
 * Desarrolador: Carlos Morante
 * Feha: 21 Diciembre 2024
***********************************************************/
import React from 'react';

interface ContentProps {
    children: React.ReactNode;
}

/**
 * Componente contenedor del contenido principal
 * @param param0 
 * @returns 
 */
const Content: React.FC<ContentProps> = ({ children }) => {
    return (
        <div className="h-[calc(100vh-115px)] overflow-auto content-scroll">
            {children}
        </div>
    )
}

export default React.memo(Content);