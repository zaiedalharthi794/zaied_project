
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
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{t.evaluation.title}</h1>
                <p className="text-xl text-amber-600 dark:text-amber-400 mb-8">{t.evaluation.prompt}</p>
                
                {data.evaluations && data.evaluations.length > 0 && (
                     <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200/80 dark:border-gray-700/60 mb-12 text-right rtl:text-right ltr:text-left">
                         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">{t.evaluation.previousEvaluations}</h2>
                         <div className="space-y-6">
                             {data.evaluations.map((evalItem, index) => (
                                 <div key={index} className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg relative border-r-4 rtl:border-r-4 rtl:border-l-0 ltr:border-l-4 ltr:border-r-0 border-amber-500">
                                     <QuoteIcon className="absolute top-5 ltr:left-5 rtl:right-5 w-8 h-8 text-amber-100 dark:text-gray-700" />
                                     <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap z-10 relative leading-relaxed">{evalItem.text}</p>
                                     <p className="font-semibold text-gray-800 dark:text-white mt-4 text-left rtl:text-right z-10 relative">— {evalItem.teacher}</p>
                                 </div>
                             ))}
                         </div>
                     </div>
                 )}

                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200/80 dark:border-gray-700/60">
                    {submitted ? (
                        <p className="text-green-600 dark:text-green-400 text-lg font-semibold">{t.evaluation.success}</p>
                    ) : (
                        <form onSubmit={handleSubmit} className="text-right rtl:text-right ltr:text-left">
                           <div className="mb-4">
                               <label htmlFor="teacherName" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">{t.evaluation.teacherName}</label>
                               <input
                                   type="text"
                                   id="teacherName"
                                   value={teacherName}
                                   onChange={(e) => setTeacherName(e.target.value)}
                                   className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
                                   required
                               />
                           </div>
                            <textarea
                                value={newEvaluation}
                                onChange={(e) => setNewEvaluation(e.target.value)}
                                placeholder={t.evaluation.placeholder}
                                className="w-full h-48 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-4 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow mb-6"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105"
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
