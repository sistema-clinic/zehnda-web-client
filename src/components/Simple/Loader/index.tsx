/**********************************************************
 * Componente: Loader
 * Description: Precargador simple para la app
 * Desarrolador: Carlos Morante
 * Feha: 12 Enero 2025
***********************************************************/
import { ProgressSpinner } from 'primereact/progressspinner';

/**
 * Precargador simple para la app
 * @returns 
 */
const Loader: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <ProgressSpinner />
        </div>
    );
}

export default Loader;