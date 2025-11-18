
import React, { useState, useEffect } from 'react';
import { Translation, PortfolioData, Evaluation } from '../types';
import { QuoteIcon, TrashIcon } from '../components/Icons';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

interface EvaluationPageProps {
    t: Translation;
    data: PortfolioData;
    setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
    isAdmin: boolean;
}

const EvaluationPage: React.FC<EvaluationPageProps> = ({ t, data, isAdmin }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [newEvaluation, setNewEvaluation] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [comments, setComments] = useState<Evaluation[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch comments from Firestore real-time
    useEffect(() => {
        const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedComments = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Evaluation[];
            setComments(fetchedComments);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newEvaluation.trim() && name.trim() && role.trim()) {
            const date = new Date().toLocaleDateString(document.documentElement.lang === 'ar' ? 'ar-EG' : 'en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });
            
            try {
                await addDoc(collection(db, "comments"), {
                    name,
                    role,
                    text: newEvaluation,
                    date,
                    createdAt: serverTimestamp()
                });

                setSubmitted(true);
                setNewEvaluation('');
                setName('');
                setRole('');
                setTimeout(() => setSubmitted(false), 5000); // Reset after 5 seconds
            } catch (error) {
                console.error("Error adding comment: ", error);
                alert("Failed to add comment. Please try again.");
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm(t.admin.deleteEvaluationConfirm || 'Are you sure you want to delete this comment?')) {
            try {
                await deleteDoc(doc(db, "comments", id));
            } catch (error) {
                console.error("Error deleting comment: ", error);
                alert("Failed to delete comment.");
            }
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">{t.evaluation.title}</h1>
                <p className="text-xl text-primary mb-8">{t.evaluation.prompt}</p>
                
                {isLoading ? (
                    <div className="flex justify-center py-8">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                     comments.length > 0 && (
                         <div className="bg-card text-card-foreground p-6 rounded-xl shadow-lg border border-border/60 mb-12 text-right rtl:text-right ltr:text-left">
                             <h2 className="text-2xl font-bold text-foreground mb-6 text-center">{t.evaluation.previousEvaluations}</h2>
                             <div className="space-y-6">
                                 {comments.map((evalItem) => (
                                     <div key={evalItem.id} className="bg-secondary p-6 rounded-lg relative border-r-4 rtl:border-r-4 rtl:border-l-0 ltr:border-l-4 ltr:border-r-0 border-primary shadow-sm group">
                                         <QuoteIcon className="absolute top-5 ltr:left-5 rtl:right-5 w-8 h-8 text-primary/10" />
                                         
                                         <div className="flex justify-between items-start mb-3 relative z-10">
                                             <div>
                                                 <h3 className="font-bold text-lg text-foreground">{evalItem.name}</h3>
                                                 <p className="text-sm text-primary font-medium">{evalItem.role}</p>
                                             </div>
                                             {evalItem.date && (
                                                 <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded-full border border-border">{evalItem.date}</span>
                                             )}
                                         </div>

                                         <p className="text-muted-foreground whitespace-pre-wrap z-10 relative leading-relaxed mt-2">{evalItem.text}</p>
                                         
                                          {isAdmin && evalItem.id && (
                                            <button 
                                                onClick={() => handleDelete(evalItem.id!)}
                                                className="absolute top-2 ltr:right-2 rtl:left-2 p-2 bg-destructive text-destructive-foreground rounded-full shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-105"
                                                title={t.admin.deleteEvaluation}
                                            >
                                               <TrashIcon className="w-4 h-4" />
                                            </button>
                                        )}
                                     </div>
                                 ))}
                             </div>
                         </div>
                     )
                 )}

                <div className="bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border/60">
                    {submitted ? (
                        <div className="flex flex-col items-center justify-center py-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <p className="text-green-600 dark:text-green-400 text-xl font-bold">{t.evaluation.success}</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="text-right rtl:text-right ltr:text-left space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">{t.evaluation.namePlaceholder}</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={t.evaluation.namePlaceholder}
                                        className="w-full bg-secondary text-foreground p-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-muted-foreground mb-1">{t.evaluation.rolePlaceholder}</label>
                                    <input
                                        type="text"
                                        id="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        placeholder={t.evaluation.rolePlaceholder}
                                        className="w-full bg-secondary text-foreground p-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="comment" className="block text-sm font-medium text-muted-foreground mb-1">{t.evaluation.placeholder}</label>
                                <textarea
                                    id="comment"
                                    value={newEvaluation}
                                    onChange={(e) => setNewEvaluation(e.target.value)}
                                    placeholder={t.evaluation.placeholder}
                                    className="w-full h-40 bg-secondary text-foreground p-4 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-[1.02] mt-4 shadow-md"
                            >
                                {t.evaluation.submit}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EvaluationPage;
