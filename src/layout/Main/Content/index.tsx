import React from 'react';

interface ContentProps {
    children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
    return (
        <div className="h-[calc(100vh-115px)] overflow-auto">
            {children}
        </div>
    )
}

export default React.memo(Content);