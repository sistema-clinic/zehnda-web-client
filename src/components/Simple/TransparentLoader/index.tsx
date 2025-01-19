
import { ProgressSpinner } from 'primereact/progressspinner';

const TransparentLoader: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-transparent">
            <ProgressSpinner />
        </div>
    );
}

export default TransparentLoader;