
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { Translation, ChatMessage, PortfolioData } from '../types';
import { XIcon } from './Icons';

interface ChatbotProps {
    isOpen: boolean;
    onClose: () => void;
    t: Translation;
    portfolioData: PortfolioData;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, t, portfolioData }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // When portfolio data changes (e.g., language switch),
    // reset the chat session to force re-initialization with the new system instruction.
    useEffect(() => {
        chatRef.current = null;
    }, [portfolioData]);

    // Set initial message when the component mounts or translations change
    useEffect(() => {
        if (t.chatbot?.initialMessage) {
            setMessages([{ role: 'model', text: t.chatbot.initialMessage }]);
        }
    }, [t.chatbot?.initialMessage]);
    
    // Scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = inputValue.trim();
        if (!trimmedInput) return;

        const newUserMessage: ChatMessage = { role: 'user', text: trimmedInput };
        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            if (!chatRef.current) {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const systemInstruction = `You are a friendly, helpful AI assistant for a student's portfolio website. 
                Your name is 'Enjaz Assistant'.
                The student's name is Zaied.
                Answer all questions based *only* on the provided portfolio data. 
                Do not invent information. If the answer is not in the data, say you don't have that information.
                Keep your answers concise and to the point.
                Here is the student's portfolio data in JSON format: ${JSON.stringify(portfolioData)}`;

                chatRef.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: systemInstruction,
                    },
                });
            }

            const response = await chatRef.current.sendMessage({ message: trimmedInput });
            const modelResponse: ChatMessage = { role: 'model', text: response.text };
            setMessages(prev => [...prev, modelResponse]);

        } catch (error) {
            console.error("Gemini API error:", error);
            const errorText = t.chatbot.connectionError || "Sorry, I'm having trouble connecting right now.";
            const errorMessage: ChatMessage = { role: 'model', text: errorText };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-0 ltr:right-0 rtl:left-0 mb-4 ltr:mr-4 rtl:ml-4 z-[100]">
            <div className="w-full max-w-sm h-[70vh] flex flex-col bg-card text-card-foreground rounded-2xl shadow-2xl border border-border">
                <header className="flex items-center justify-between p-4 border-b border-border">
                    <h3 className="text-lg font-bold text-foreground">{t.chatbot.title}</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-muted-foreground hover:bg-accent" aria-label={t.chatbot.close}>
                        <XIcon className="w-6 h-6" />
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-lg' : 'bg-secondary text-secondary-foreground rounded-bl-lg'}`}>
                                <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                     {isLoading && (
                        <div className="flex justify-start">
                             <div className="max-w-[80%] p-3 rounded-2xl bg-secondary rounded-bl-lg">
                                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
                    <div className="relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={t.chatbot.placeholder}
                            className="w-full bg-secondary text-foreground ltr:pl-4 rtl:pr-4 ltr:pr-12 rtl:pl-12 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-ring border border-border"
                        />
                        <button type="submit" disabled={isLoading} className="absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:bg-muted">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;
