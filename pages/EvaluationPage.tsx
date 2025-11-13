
import React, { useState } from 'react';
import { Translation, PortfolioData } from '../types';

interface EvaluationPageProps {
    t: Translation;
    data: PortfolioData;
    setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

const EvaluationPage: React.FC<EvaluationPageProps> = ({ t, data, setData }) => {
    const [newEvaluation, setNewEvaluation] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newEvaluation.trim()) {
            setData(prevData => ({
                ...prevData,
                evaluations: [newEvaluation, ...(prevData.evaluations || [])]
            }));
            setSubmitted(true);
            setNewEvaluation('');
            setTimeout(() => setSubmitted(false), 5000); // Reset after 5 seconds
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{t.evaluation.title}</h1>
                <p className="text-xl text-red-400 mb-8">{t.evaluation.prompt}</p>
                
                {data.evaluations && data.evaluations.length > 0 && (
                     <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700 mb-8 text-right rtl:text-right ltr:text-left">
                         <h2 className="text-2xl font-bold text-red-400 mb-4">{t.evaluation.previousEvaluations}</h2>
                         <div className="space-y-4">
                             {data.evaluations.map((evalText, index) => (
                                 <div key={index} className="bg-gray-700 p-4 rounded-md border-r-4 rtl:border-r-4 rtl:border-l-0 ltr:border-l-4 ltr:border-r-0 border-red-500">
                                     <p className="text-gray-300 whitespace-pre-wrap">{evalText}</p>
                                 </div>
                             ))}
                         </div>
                     </div>
                 )}

                <div className="bg-gray-800/50 p-8 rounded-lg shadow-lg border border-gray-700">
                    {submitted ? (
                        <p className="text-green-400 text-lg">{t.evaluation.success}</p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <textarea
                                value={newEvaluation}
                                onChange={(e) => setNewEvaluation(e.target.value)}
                                placeholder={t.evaluation.placeholder}
                                className="w-full h-48 bg-gray-700 text-gray-200 p-4 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow mb-6"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 transform hover:scale-105"
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