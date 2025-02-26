/**********************************************************
 * Componente: App
 * Desarrolador: Carlos Morante
 * Feha: 10 enero 2025
***********************************************************/
import { useAuth } from '@/contexts/auth/auth'
import './index.scss'
import { motion } from 'motion/react'
import { useState } from 'react'
import TransparentLoader from '@/components/Simple/TransparentLoader'

/**
 * clase para renderizar la vista de contactos
 * @returns Clase
 */
const Contacts: React.FC = () => {
    const user : any = useAuth()
    const [isLoading] = useState(false);
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"    
            >
                {isLoading && (
                    <div className="overlay">
                        <TransparentLoader />
                    </div>
                )}
                <div className="body">  
                    <div className="container">
                        <h1>Hi! Welcome&nbsp;
                            {user.internalUserdata.internalData.firstName}&nbsp; 
                            {user?.internalUserdata?.internalData?.lastName ? user.internalUserdata.internalData.lastName : ''} to this amazing app!</h1>
                        <p>Something interesting will happen here soon.</p>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default Contacts