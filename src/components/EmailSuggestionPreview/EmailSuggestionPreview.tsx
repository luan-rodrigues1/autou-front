"use client";
import { useState, useEffect } from 'react';

interface EmailSuggestionPreviewProps {
    assunto: string;
    mensagem: string;
    categoria: string;
    onNewSuggestion: () => void;
}

const EmailSuggestionPreview = ({ assunto, mensagem, categoria, onNewSuggestion }: EmailSuggestionPreviewProps) => {
    const [copiedAssunto, setCopiedAssunto] = useState(false);
    const [copiedMensagem, setCopiedMensagem] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleCopy = async (text: string, type: 'assunto' | 'mensagem') => {
        if (!isMounted) return;
        
        try {
            await navigator.clipboard.writeText(text);
            if (type === 'assunto') {
                setCopiedAssunto(true);
                setTimeout(() => setCopiedAssunto(false), 2000);
            } else {
                setCopiedMensagem(true);
                setTimeout(() => setCopiedMensagem(false), 2000);
            }
        } catch (err) {
            console.error('Erro ao copiar texto:', err);
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div className="w-full h-full p-8 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-md rounded-2xl shadow-2xl">
            <div className="flex flex-col w-full h-full">
                <div className="flex-none space-y-2 mb-4">
                    <label 
                        className="block text-slate-200 text-lg font-medium tracking-wide" 
                        htmlFor="categoria"
                    >
                        Categoria
                    </label>
                    <div className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-100">
                        {categoria}
                    </div>
                </div>

                <div className="flex-none space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                        <label 
                            className="block text-slate-200 text-lg font-medium tracking-wide" 
                            htmlFor="assunto"
                        >
                            Sugestão de Assunto
                        </label>
                        <button
                            onClick={() => handleCopy(assunto, 'assunto')}
                            className="px-2 py-0.5 text-xs bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 rounded transition-colors duration-200 cursor-pointer"
                        >
                            {copiedAssunto ? '✓' : '⎘'}
                        </button>
                    </div>
                    <div className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-100">
                        {assunto}
                    </div>
                </div>

                <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-center">
                        <label 
                            className="block text-slate-200 text-lg font-medium tracking-wide" 
                            htmlFor="mensagem"
                        >
                            Sugestão de Resposta
                        </label>
                        <button
                            onClick={() => handleCopy(mensagem, 'mensagem')}
                            className="px-2 py-0.5 text-xs bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 rounded transition-colors duration-200 cursor-pointer"
                        >
                            {copiedMensagem ? '✓' : '⎘'}
                        </button>
                    </div>
                    <div className="w-full h-full max-h-[140px] px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-100 overflow-y-auto">
                        <div className="whitespace-pre-wrap break-words">
                            {mensagem}
                        </div>
                    </div>
                </div>

                <div className="flex-none flex items-center justify-center mt-4">
                    <button 
                        onClick={onNewSuggestion}
                        className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-indigo-500/25 cursor-pointer"
                    >
                        Nova Sugestão
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailSuggestionPreview;
