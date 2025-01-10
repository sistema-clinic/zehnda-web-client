
import { ProgressSpinner } from 'primereact/progressspinner';

const Loader: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <ProgressSpinner />
        </div>
    );
}

export default Loader;