import { useState } from 'react';

interface SendEmailFormProps {
    onSubmit: (assunto: string, mensagem: string) => void;
    isLoading: boolean;
}

const SendEmailForm = ({ onSubmit, isLoading }: SendEmailFormProps) => {
    const [formData, setFormData] = useState({
        assunto: '',
        mensagem: ''
    });

    const [errors, setErrors] = useState({
        assunto: '',
        mensagem: ''
    });

    const validateForm = () => {
        const newErrors = {
            assunto: '',
            mensagem: ''
        };
        let isValid = true;

        if (!formData.assunto.trim()) {
            newErrors.assunto = 'O assunto é obrigatório*';
            isValid = false;
        } else if (formData.assunto.length > 50) {
            newErrors.assunto = `O assunto deve ter no máximo 50 caracteres`;
            isValid = false;
        }

        if (!formData.mensagem.trim()) {
            newErrors.mensagem = 'A mensagem é obrigatória*';
            isValid = false;
        } else if (formData.mensagem.length > 500) {
            newErrors.mensagem = `A mensagem deve ter no máximo 500 caracteres`;
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData.assunto, formData.mensagem);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const maxLength = name === 'assunto' ? 50 : 500;
        
        if (value.length <= maxLength) {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
        
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <div className="w-full h-full p-8 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-md rounded-2xl shadow-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col w-full h-full gap-8">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label 
                            className="block text-slate-200 text-lg font-medium tracking-wide" 
                            htmlFor="assunto"
                        >
                            Assunto
                        </label>
                        <div className="flex items-center gap-2">
                            {errors.assunto && (
                                <p className="text-red-500 text-sm">{errors.assunto}</p>
                            )}
                            <span className="text-slate-400 text-sm">
                                {formData.assunto.length}/50
                            </span>
                        </div>
                    </div>
                    <div className="relative">
                        <input 
                            type="text" 
                            id="assunto" 
                            name="assunto"
                            value={formData.assunto}
                            onChange={handleChange}
                            maxLength={50}
                            className={`w-full px-4 py-3 bg-slate-800/50 border ${errors.assunto ? 'border-red-500' : 'border-slate-700/50'} rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300`}
                            placeholder="Digite o assunto do email"
                        />
                        {formData.assunto && (
                            <button
                                disabled={isLoading}
                                onClick={() => setFormData(prev => ({ ...prev, assunto: '' }))}
                                className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 rounded transition-colors duration-200 cursor-pointer"
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>

                <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                        <label 
                            className="block text-slate-200 text-lg font-medium tracking-wide" 
                            htmlFor="mensagem"
                        >
                            Mensagem
                        </label>
                        <div className="flex items-center gap-2">
                            {errors.mensagem && (
                                <p className="text-red-500 text-sm">{errors.mensagem}</p>
                            )}
                            <span className="text-slate-400 text-sm">
                                {formData.mensagem.length}/500
                            </span>
                        </div>
                    </div>
                    <div className="relative h-full">
                        <textarea 
                            id="mensagem" 
                            name="mensagem"
                            value={formData.mensagem}
                            onChange={handleChange}
                            maxLength={500}
                            className={`w-full h-[calc(100%-2rem)] px-4 py-3 bg-slate-800/50 border ${errors.mensagem ? 'border-red-500' : 'border-slate-700/50'} rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 resize-none`}
                            placeholder="Digite sua mensagem aqui..."
                        />
                        {formData.mensagem && (
                            <button
                                disabled={isLoading}
                                onClick={() => setFormData(prev => ({ ...prev, mensagem: '' }))}
                                className="absolute right-3 top-3 px-2 py-0.5 text-xs bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 rounded transition-colors duration-200 cursor-pointer"
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>

                <button 
                    disabled={isLoading}
                    type="submit"
                    className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-indigo-500/25 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Gerando sugestão</span>
                        </>
                    ) : (
                        'Analisar Mensagem'
                    )}
                </button>
            </form>
        </div>
    );
};

export default SendEmailForm;