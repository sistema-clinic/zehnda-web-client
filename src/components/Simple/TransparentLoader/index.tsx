/**********************************************************
 * Componente: TransparentLoader
 * Description: Precargador transparente para la app
 * Desarrolador: Carlos Morante
 * Feha: 12 Enero 2025
***********************************************************/
import { ProgressSpinner } from 'primereact/progressspinner';

/**
 * Componente que se muestra al cargar un componente flotando sobre el contenido
 * @returns 
 */
const TransparentLoader: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-transparent">
            <ProgressSpinner />
        </div>
    );
}

export default TransparentLoader;