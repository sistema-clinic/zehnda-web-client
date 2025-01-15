import { motion } from "motion/react";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useIntl } from "react-intl";


interface PasswordFormData {
    original_password: string;
    new_password: string;
    repeat_password: string;
}

const ChangePassword: React.FC = () => {

    const [formData, setFormData] = useState<PasswordFormData>({
        original_password: '',
        new_password: '',
        repeat_password: ''
    });
    const {messages} = useIntl();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <>
        <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="mt-10 flex items-center justify-center">
                    <div className="bg-transparent p-1 w-full lg:max-w-xl sm:max-w-lg">
                        <h2 className="text-xl font-bold mb-4 text-center">
                            {String(messages.change_password_title)}
                        </h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        <div className="flex flex-col">
                            <FloatLabel>
                                <InputText
                                    id="original_password"
                                    name="original_password"
                                    value={formData.original_password}
                                    onChange={handleInputChange}
                                    className="w-full"
                                />
                                <label htmlFor="txtUsername">{String(messages.change_password_original_password)}</label>
                            </FloatLabel>
                            </div>  
                    </form>
                    </div>
                    
                </div>
            </motion.div>
        </>
    )
}

export default ChangePassword;