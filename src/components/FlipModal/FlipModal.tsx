"use client";
import { useState, useEffect } from "react";
import SendEmailForm from "./SendEmailForm/SendEmailForm";
import EmailSuggestionPreview from "../EmailSuggestionPreview/EmailSuggestionPreview";

const FlipModal = () => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<{
    assunto: string;
    mensagem: string;
    categoria: string;
  } | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (assunto: string, mensagem: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_subject: assunto,
          email_content: mensagem,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar email");
      }

      const data = await response.json();
      setSuggestion({
        assunto: `${data.suggested_response.subject}`,
        mensagem: `${data.suggested_response.content}`,
        categoria: `${data.category}`,
      });
      setIsFlipped(true);
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSuggestion = () => {
    setIsFlipped(false);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-[95%] h-[500px] mx-auto max-w-[550px] perspective-1000">
      <div
        className={`relative w-full h-full transition-all duration-700 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.7s",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute w-full h-full backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div
            className={`w-full h-full transition-all duration-700 ${
              isFlipped ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <SendEmailForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>

        <div
          className="absolute w-full h-full backface-hidden rotate-y-180"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div
            className={`w-full h-full transition-all duration-700 ${
              isFlipped ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {suggestion && (
              <EmailSuggestionPreview
                assunto={suggestion.assunto}
                mensagem={suggestion.mensagem}
                categoria={suggestion.categoria}
                onNewSuggestion={handleNewSuggestion}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipModal;
