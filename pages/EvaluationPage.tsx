
import React, { useState } from 'react';
import { Translation, PortfolioData } from '../types';
import { QuoteIcon } from '../components/Icons';

interface EvaluationPageProps {
    t: Translation;
    data: PortfolioData;
    setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

const EvaluationPage: React.FC<EvaluationPageProps> = ({ t, data, setData }) => {
    const [teacherName, setTeacherName] = useState('');
    const [newEvaluation, setNewEvaluation] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newEvaluation.trim() && teacherName.trim()) {
            setData(prevData => ({
                ...prevData,
                evaluations: [{ teacher: teacherName, text: newEvaluation }, ...(prevData.evaluations || [])]
            }));
            setSubmitted(true);
            setNewEvaluation('');
            setTeacherName('');
            setTimeout(() => setSubmitted(false), 5000); // Reset after 5 seconds
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">{t.evaluation.title}</h1>
                <p className="text-xl text-primary mb-8">{t.evaluation.prompt}</p>
                
                {data.evaluations && data.evaluations.length > 0 && (
                     <div className="bg-card text-card-foreground p-6 rounded-xl shadow-lg border border-border/60 mb-12 text-right rtl:text-right ltr:text-left">
                         <h2 className="text-2xl font-bold text-foreground mb-6 text-center">{t.evaluation.previousEvaluations}</h2>
                         <div className="space-y-6">
                             {data.evaluations.map((evalItem, index) => (
                                 <div key={index} className="bg-secondary p-6 rounded-lg relative border-r-4 rtl:border-r-4 rtl:border-l-0 ltr:border-l-4 ltr:border-r-0 border-primary">
                                     <QuoteIcon className="absolute top-5 ltr:left-5 rtl:right-5 w-8 h-8 text-primary/10" />
                                     <p className="text-muted-foreground whitespace-pre-wrap z-10 relative leading-relaxed">{evalItem.text}</p>
                                     <p className="font-semibold text-foreground mt-4 text-left rtl:text-right z-10 relative">— {evalItem.teacher}</p>
                                 </div>
                             ))}
                         </div>
                     </div>
                 )}

                <div className="bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border/60">
                    {submitted ? (
                        <p className="text-green-600 dark:text-green-400 text-lg font-semibold">{t.evaluation.success}</p>
                    ) : (
                        <form onSubmit={handleSubmit} className="text-right rtl:text-right ltr:text-left">
                           <div className="mb-4">
                               <label htmlFor="teacherName" className="block text-sm font-bold mb-2">{t.evaluation.teacherName}</label>
                               <input
                                   type="text"
                                   id="teacherName"
                                   value={teacherName}
                                   onChange={(e) => setTeacherName(e.target.value)}
                                   className="w-full bg-secondary text-foreground p-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                                   required
                               />
                           </div>
                            <textarea
                                value={newEvaluation}
                                onChange={(e) => setNewEvaluation(e.target.value)}
                                placeholder={t.evaluation.placeholder}
                                className="w-full h-48 bg-secondary text-foreground p-4 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-shadow mb-6"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105"
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